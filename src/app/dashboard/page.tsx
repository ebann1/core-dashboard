"use client";

import { useState, useEffect, useRef } from "react";
import { commandColumns, type Command } from "@/lib/commands";
import NeuralOrb from "@/components/NeuralOrb";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [clock, setClock] = useState("--:--:--");
  const [clockDate, setClockDate] = useState("— — —");
  const [used, setUsed] = useState<Set<string>>(new Set());
  const [flashing, setFlashing] = useState<Set<string>>(new Set());
  const flashTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [gitStatus, setGitStatus] = useState("working tree clean");
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const timers = flashTimers.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setClock(n.toTimeString().slice(0, 8));
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
      setClockDate(`${days[n.getDay()]} · ${months[n.getMonth()]} ${n.getDate()}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fire = (item: Command) => {
    if (!item.active) return;
    navigator.clipboard.writeText(item.prompt ?? "").catch(() => {});
    setUsed((prev) => new Set(prev).add(item.cmd));
    setFlashing((prev) => new Set(prev).add(item.cmd));
    const timers = flashTimers.current;
    const existing = timers.get(item.cmd);
    if (existing) clearTimeout(existing);
    timers.set(
      item.cmd,
      setTimeout(() => {
        setFlashing((prev) => {
          const next = new Set(prev);
          next.delete(item.cmd);
          return next;
        });
        timers.delete(item.cmd);
      }, 1000)
    );
  };

  const resetSession = () => {
    flashTimers.current.forEach((t) => clearTimeout(t));
    flashTimers.current.clear();
    setUsed(new Set());
    setFlashing(new Set());
  };

  const doPull = () => {
    setGitStatus("pulling from origin/main...");
    setTimeout(() => setGitStatus("pulled · up to date · project-state.md loaded"), 1400);
  };
  const doCommit = () => {
    setGitStatus("committing · pushing · updating changelog...");
    setTimeout(() => setGitStatus("pushed ✓ · changelog updated · parking lot swept"), 1600);
  };

  return (
    <div className={styles.root}>
      {/* TOP BAR */}
      <div className={styles.topbar}>
        <div className={styles.logo}>
          C.O.R.E.
          <span className={styles.logoSub}>COGNITIVE ORCHESTRATION RUNTIME ENGINE</span>
        </div>
        <div className={styles.projWrap}>
          <span className={styles.projLabel}>PROJECT</span>
          <select className={styles.projSelect}>
            <option>Project Alpha</option>
            <option>Project Beta</option>
            <option>Project Gamma</option>
          </select>
        </div>
        <div className={styles.topStatus}>
          <div className={styles.statItem}><div className={`${styles.bulb} ${styles.bulbGreen}`} />SYSTEM</div>
          <div className={styles.statItem}><div className={`${styles.bulb} ${styles.bulbGreen}`} />GITHUB</div>
          <div className={styles.statItem}><div className={`${styles.bulb} ${styles.bulbAmber}`} />SESSION</div>
        </div>
        <div className={styles.clock}>
          {clock}
          <small>{clockDate}</small>
        </div>
      </div>

      {/* MAIN */}
      <div className={styles.main}>
        {/* LEFT — LOGIC PANEL */}
        <div className={`${styles.panel} ${styles.left}`}>
          <div className={styles.secLabel}>Logic Panel</div>

          <div className={styles.metric}>
            <div className={styles.metricHead}>
              <span className={styles.metricName}>◈ CLAUDE 5HR WINDOW</span>
              <span className={styles.metricVal}>62<small>%</small></span>
            </div>
            <div className={styles.track}><div className={`${styles.fill} ${styles.fGreen}`} style={{ width: "62%" }} /></div>
            <div className={styles.metricSub}>resets in 1h 48m</div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricHead}>
              <span className={styles.metricName}>◈ API CREDITS · TODAY</span>
              <span className={styles.metricVal}><small>$</small>1.24</span>
            </div>
            <div className={styles.track}><div className={`${styles.fill} ${styles.fGreen}`} style={{ width: "24%" }} /></div>
            <div className={styles.metricSub}>daily soft limit $5.00</div>
          </div>

          <div className={styles.secLabel}>Context Windows</div>
          {[
            { name: "Main Thread", pct: 71, cls: styles.fYellow, col: "#d4a017" },
            { name: "CTO · Alpha", pct: 28, cls: styles.fGreen, col: "#2ec96a" },
            { name: "CFO · Alpha", pct: 14, cls: styles.fGreen, col: "#2ec96a" },
            { name: "Beta", pct: 84, cls: styles.fOrange, col: "#d4601a" },
          ].map((c) => (
            <div className={styles.ctxRow} key={c.name}>
              <span className={styles.ctxName}>{c.name}</span>
              <div className={styles.ctxTrack}><div className={`${styles.fill} ${c.cls}`} style={{ width: `${c.pct}%` }} /></div>
              <span className={styles.ctxPct} style={{ color: c.col }}>{c.pct}%</span>
            </div>
          ))}

          <div className={styles.secLabel}>Session</div>
          <div className={styles.kv}><span className={styles.k}>MACHINE</span><span className={styles.v}>MacBook Pro</span></div>
          <div className={styles.kv}><span className={styles.k}>STARTED</span><span className={styles.v}>09:42:11</span></div>
          <div className={styles.kv}><span className={styles.k}>LAST PUSH</span><span className={`${styles.v} ${styles.good}`}>SYNCED ✓</span></div>
          <div className={styles.kv}><span className={styles.k}>BRANCH</span><span className={styles.v}>main</span></div>
        </div>

        {/* CENTER — ORB */}
        <div className={`${styles.panel} ${styles.center}`}>
          <div className={styles.orbWrap}>
            <NeuralOrb />
          </div>
          <div className={styles.orbCaption}>NEURAL MESH · ACTIVE</div>
          <div className={styles.centerProject}>
            <b>PROJECT ALPHA</b> · <b className={styles.amber}>DESIGN PHASE</b> · <b>30% COMPLETE</b>
          </div>
        </div>

        {/* RIGHT — ACTION ITEMS */}
        <div className={`${styles.panel} ${styles.right}`}>
          <div className={styles.secLabel}>Action Items</div>
          <div className={styles.remember}>
            ◈ REMEMBER — important UI idea for the Alpha main screen. Never came back to this.
            <div className={styles.t}>FLAGGED · JUL 6</div>
          </div>
          <div className={`${styles.alert} ${styles.aCrit}`}>
            Beta context at 84% — summarize &amp; reset before next session.
            <div className={styles.t}>CONTEXT · CRITICAL</div>
          </div>
          <div className={`${styles.alert} ${styles.aWarn}`}>
            Main Thread context at 71% — approaching ceiling.
            <div className={styles.t}>CONTEXT · WATCH</div>
          </div>
          <div className={`${styles.alert} ${styles.aWarn}`}>
            Alpha — Legal checkpoint not yet run. Required after PRD.
            <div className={styles.t}>LEGAL FLAG</div>
          </div>

          <div className={styles.secLabel}>Notifications</div>
          <div className={`${styles.alert} ${styles.aInfo}`}>
            Parking lot: 8 items across all projects awaiting action.
            <div className={styles.t}>PARKING LOT</div>
          </div>
          <div className={`${styles.alert} ${styles.aOk}`}>
            GitHub synced — all repos up to date.
            <div className={styles.t}>2 MIN AGO</div>
          </div>

          <div className={styles.secLabel}>Insights</div>
          <div className={`${styles.alert} ${styles.aInfo} ${styles.comingSoon}`}>
            AI pattern recognition — coming soon.
            <div className={styles.t}>PHASE 4</div>
          </div>
        </div>
      </div>

      {/* COMMAND LAUNCHER */}
      <div className={styles.launcher}>
        <div className={styles.launcherHead}>
          <div className={styles.launcherTitle}>COMMAND LAUNCHER</div>
          <div className={styles.launcherSub}>PROJECT LIFECYCLE · LEFT TO RIGHT · CLICK TO FIRE</div>
          <div className={styles.launcherLegend}>
            <span><span className={`${styles.legendChip} ${styles.chipDone}`} />RUN THIS SESSION</span>
            <span><span className={`${styles.legendChip} ${styles.chipTodo}`} />NOT YET RUN</span>
          </div>
          <div className={styles.gitBtns}>
            <button className={`${styles.gitBtn} ${styles.btnPull}`} onClick={doPull}>⇣ PULL</button>
            <button className={`${styles.gitBtn} ${styles.btnCommit}`} onClick={doCommit}>⇡ COMMIT</button>
            <button className={`${styles.gitBtn} ${styles.btnReset}`} onClick={resetSession}>↺ RESET SESSION</button>
          </div>
        </div>
        <div className={styles.gitStatusLine}>{gitStatus}</div>

        <div className={styles.launcherGrid}>
          {commandColumns.map((c, idx) => (
            <div className={styles.cmdCol} key={c.col}>
              <div className={styles.cmdColHead}>
                <span>{c.col}</span>
                <span className={styles.cmdColNum}>{String(idx + 1).padStart(2, "0")}</span>
              </div>
              {c.items.map((item) => (
                <button
                  key={item.cmd}
                  className={[
                    styles.cmdBtn,
                    !item.active ? styles.cmdInactive : "",
                    item.active && used.has(item.cmd) ? styles.cmdDone : "",
                    item.active && flashing.has(item.cmd) ? styles.cmdFlash : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => fire(item)}
                  onMouseEnter={(e) =>
                    setTooltip({ text: item.tip, x: e.clientX, y: e.clientY })
                  }
                  onMouseMove={(e) =>
                    setTooltip({ text: item.tip, x: e.clientX, y: e.clientY })
                  }
                  onMouseLeave={() => setTooltip(null)}
                >
                  {item.cmd}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* TOOLTIP */}
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x + 16, top: tooltip.y + 16 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
