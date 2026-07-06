"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Stage = "decoy" | "nuclear";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// Locked positions spell part of a code; underscores cycle.
const LOCKED: (string | null)[] = ["E", "P", "N", null, null, "P", null, "S"];

export default function WarGamesLogin() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("decoy");
  const [decoyInput, setDecoyInput] = useState("");
  const [decoyMsg, setDecoyMsg] = useState("");
  const [realInput, setRealInput] = useState("");
  const [realMsg, setRealMsg] = useState("");
  const [codes, setCodes] = useState<string[]>(LOCKED.map((c) => c ?? "0"));
  const [checking, setChecking] = useState(false);

  // cycle the unlocked code positions
  useEffect(() => {
    if (stage !== "nuclear") return;
    const id = setInterval(() => {
      setCodes(() =>
        LOCKED.map((locked) =>
          locked !== null
            ? locked
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
    }, 70);
    return () => clearInterval(id);
  }, [stage]);

  const handleDecoy = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const val = decoyInput.trim().toLowerCase();
      if (val === "joshua") {
        setDecoyMsg("GREETINGS PROFESSOR FALKEN.");
        setTimeout(() => setStage("nuclear"), 1400);
      } else {
        setDecoyMsg("IDENTIFICATION NOT RECOGNIZED BY SYSTEM.");
        setTimeout(() => {
          setDecoyMsg("");
          setDecoyInput("");
        }, 1600);
      }
    },
    [decoyInput]
  );

  const handleReal = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (checking) return;
      setChecking(true);
      setRealMsg("VERIFYING LAUNCH CODE...");
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: realInput }),
        });
        if (res.ok) {
          setRealMsg("ACCESS GRANTED. STAND BY.");
          setTimeout(() => router.push("/dashboard"), 1000);
        } else {
          setRealMsg("ACCESS DENIED.");
          setTimeout(() => {
            setRealMsg("");
            setRealInput("");
            setChecking(false);
          }, 1500);
        }
      } catch {
        setRealMsg("CONNECTION ERROR.");
        setChecking(false);
      }
    },
    [realInput, checking, router]
  );

  return (
    <div className="crt-root">
      <div className="crt-scanlines" />
      <div className="crt-flicker" />
      <div className="crt-content">
        {stage === "decoy" ? (
          <div className="terminal">
            <pre className="term-text">{`
CONNECTING  7 4 5 8 ...

LOGON:  `}</pre>
            <form onSubmit={handleDecoy} className="term-form">
              <span className="prompt">&gt;</span>
              <input
                autoFocus
                className="term-input"
                value={decoyInput}
                onChange={(e) => setDecoyInput(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
            </form>
            <pre className="term-text dim">{`
HELP NOT AVAILABLE

'GAMES' REFERS TO MODELS, SIMULATIONS AND
GAMES WHICH HAVE TACTICAL AND STRATEGIC
APPLICATIONS.`}</pre>
            {decoyMsg && <div className="term-msg">{decoyMsg}</div>}
          </div>
        ) : (
          <div className="terminal nuclear">
            <div className="nuke-header">
              DEFCON 1 &nbsp;·&nbsp; WAR OPERATION PLAN RESPONSE &nbsp;·&nbsp; LAUNCH SEQUENCE
            </div>

            <div className="code-grid">
              {codes.map((c, i) => (
                <span
                  key={i}
                  className={`code-cell ${LOCKED[i] !== null ? "locked" : ""}`}
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="nuke-status">
              PRIMARY ACCESS CODE &nbsp;·&nbsp; DECRYPTION IN PROGRESS
            </div>

            <form onSubmit={handleReal} className="real-form">
              <label className="real-label">OVERRIDE CODE:</label>
              <input
                autoFocus
                type="password"
                className="real-input"
                value={realInput}
                onChange={(e) => setRealInput(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
              <button type="submit" className="real-btn">
                ENTER
              </button>
            </form>
            {realMsg && <div className="term-msg">{realMsg}</div>}
          </div>
        )}
      </div>

      <style jsx>{`
        .crt-root {
          position: fixed;
          inset: 0;
          background: #030806;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-share-tech), monospace;
        }
        .crt-content {
          position: relative;
          z-index: 2;
          width: min(760px, 92vw);
          padding: 40px;
          filter: drop-shadow(0 0 6px rgba(90, 255, 160, 0.35));
        }
        .crt-scanlines {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0.28) 3px,
            rgba(0, 0, 0, 0.28) 4px
          );
        }
        .crt-flicker {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(120, 255, 180, 0.04) 0%,
            rgba(0, 0, 0, 0.4) 100%
          );
          animation: flicker 0.15s infinite;
        }
        @keyframes flicker {
          0% { opacity: 0.92; }
          50% { opacity: 1; }
          100% { opacity: 0.95; }
        }
        .terminal {
          color: #7dffb0;
          text-shadow: 0 0 8px rgba(90, 255, 160, 0.7);
          font-size: 18px;
          line-height: 1.6;
        }
        .term-text {
          margin: 0;
          white-space: pre-wrap;
          font-family: inherit;
        }
        .dim { opacity: 0.6; font-size: 15px; }
        .term-form {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 4px 0 8px;
        }
        .prompt { color: #7dffb0; }
        .term-input {
          background: transparent;
          border: none;
          outline: none;
          color: #7dffb0;
          font-family: inherit;
          font-size: 18px;
          text-shadow: 0 0 8px rgba(90, 255, 160, 0.7);
          flex: 1;
          caret-color: #7dffb0;
        }
        .term-msg {
          margin-top: 20px;
          color: #aaffcc;
          font-size: 17px;
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

        /* nuclear */
        .nuclear { color: #8affc0; }
        .nuke-header {
          font-size: 13px;
          letter-spacing: 0.14em;
          color: #cfa; 
          opacity: 0.8;
          margin-bottom: 30px;
          text-align: center;
        }
        .code-grid {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }
        .code-cell {
          width: 58px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          border: 1px solid rgba(125, 255, 176, 0.3);
          background: rgba(125, 255, 176, 0.04);
          color: #7dffb0;
          text-shadow: 0 0 12px rgba(90, 255, 160, 0.9);
        }
        .code-cell.locked {
          border-color: rgba(255, 190, 90, 0.7);
          color: #ffd27a;
          text-shadow: 0 0 14px rgba(255, 190, 90, 0.9);
          background: rgba(255, 190, 90, 0.06);
        }
        .nuke-status {
          text-align: center;
          font-size: 13px;
          letter-spacing: 0.1em;
          opacity: 0.7;
          margin: 24px 0 34px;
        }
        .real-form {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }
        .real-label {
          font-size: 16px;
          letter-spacing: 0.08em;
        }
        .real-input {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(125, 255, 176, 0.4);
          outline: none;
          color: #7dffb0;
          font-family: inherit;
          font-size: 18px;
          padding: 8px 12px;
          width: 220px;
          text-shadow: 0 0 8px rgba(90, 255, 160, 0.7);
          caret-color: #7dffb0;
        }
        .real-input:focus { border-color: rgba(125, 255, 176, 0.9); }
        .real-btn {
          background: rgba(125, 255, 176, 0.1);
          border: 1px solid rgba(125, 255, 176, 0.5);
          color: #7dffb0;
          font-family: inherit;
          font-size: 15px;
          letter-spacing: 0.1em;
          padding: 9px 18px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .real-btn:hover {
          background: rgba(125, 255, 176, 0.2);
          box-shadow: 0 0 14px rgba(125, 255, 176, 0.3);
        }
      `}</style>
    </div>
  );
}
