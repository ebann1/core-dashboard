// HMAC-signed session tokens, using Web Crypto so the same code runs in
// route handlers and edge middleware. Token format: "<expiresAtMs>.<hexSig>".

const encoder = new TextEncoder();

const SESSION_HOURS = 12;
export const SESSION_MAX_AGE = 60 * 60 * SESSION_HOURS;
export const SESSION_COOKIE = "core_session";

async function hmacHex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Compare via HMAC digests so the comparison is constant-time and
// independent of the candidate's length.
export async function passwordsMatch(
  candidate: string,
  real: string
): Promise<boolean> {
  const [a, b] = await Promise.all([
    hmacHex(candidate, real),
    hmacHex(real, real),
  ]);
  return constantTimeEqual(a, b);
}

export async function createSessionToken(secret: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const sig = await hmacHex(`session:${expiresAt}`, secret);
  return `${expiresAt}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!token || !secret) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const expiresAt = Number(token.slice(0, dot));
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = await hmacHex(`session:${expiresAt}`, secret);
  return constantTimeEqual(token.slice(dot + 1), expected);
}
