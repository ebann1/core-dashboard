import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  passwordsMatch,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/session";

// Server-side password validation.
// The real password lives ONLY in the CORE_PASSWORD environment variable.
// It is never sent to the browser and never hardcoded here.

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const real = process.env.CORE_PASSWORD;

    if (!real) {
      return NextResponse.json(
        { ok: false, error: "Server not configured." },
        { status: 500 }
      );
    }

    if (typeof password !== "string" || password.length === 0) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    if (await passwordsMatch(password, real)) {
      const res = NextResponse.json({ ok: true });
      res.cookies.set(SESSION_COOKIE, await createSessionToken(real), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: SESSION_MAX_AGE,
      });
      return res;
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
