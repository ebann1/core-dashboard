"use client";

import { useEffect, useRef } from "react";

// Color-shifting 3D vector neural orb. Pure canvas, zero external cost.
export default function NeuralOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const W = cv.width;
    const H = cv.height;
    const CX = W / 2;
    const CY = H / 2;
    const R = Math.min(W, H) * 0.42;
    let t = 0;
    let raf = 0;

    const cycle = [
      [96, 165, 250],
      [196, 100, 220],
      [70, 190, 120],
      [214, 158, 60],
    ];
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    const orbColor = (phase: number) => {
      const n = cycle.length;
      const f = phase * n;
      const i = Math.floor(f) % n;
      const j = (i + 1) % n;
      const k = f - Math.floor(f);
      return [
        Math.round(lerp(cycle[i][0], cycle[j][0], k)),
        Math.round(lerp(cycle[i][1], cycle[j][1], k)),
        Math.round(lerp(cycle[i][2], cycle[j][2], k)),
      ];
    };

    const N = 110;
    const nodes = Array.from({ length: N }, () => ({
      theta: Math.acos(2 * Math.random() - 1),
      phi: Math.random() * Math.PI * 2,
      jit: Math.random() * Math.PI * 2,
    }));

    const proj = (n: (typeof nodes)[number]) => {
      const phi = n.phi + t * 0.14;
      const theta = n.theta + Math.sin(t * 0.06 + n.jit) * 0.06;
      const x = R * Math.sin(theta) * Math.cos(phi);
      const y = R * Math.cos(theta) * 0.82;
      const z = R * Math.sin(theta) * Math.sin(phi);
      const p = (R * 3.3) / (R * 3.3 + z);
      return { sx: CX + x * p, sy: CY + y * p, z, p };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.011;
      const [r, g, b] = orbColor((t * 0.013) % 1);

      const grad = ctx.createRadialGradient(CX, CY, 10, CX, CY, R * 1.3);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.10)`);
      grad.addColorStop(0.55, `rgba(${r},${g},${b},0.03)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const P = nodes.map((n, i) => ({ ...proj(n), i }));

      ctx.lineWidth = 0.6;
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].sx - P[j].sx;
          const dy = P[i].sy - P[j].sy;
          const d = Math.hypot(dx, dy);
          const thresh = R * 0.42;
          if (d < thresh) {
            const depth = ((P[i].z + P[j].z) / 2 + R) / (2 * R);
            const wob = 0.75 + 0.25 * Math.sin(t * 2.1 + i * 0.8);
            const a = (1 - d / thresh) * depth * 0.55 * wob;
            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
            ctx.beginPath();
            ctx.moveTo(P[i].sx, P[i].sy);
            ctx.lineTo(P[j].sx, P[j].sy);
            ctx.stroke();
          }
        }
      }

      P.forEach((p) => {
        const depth = (p.z + R) / (2 * R);
        const wob = 0.82 + 0.18 * Math.sin(t * 1.6 + p.i * 1.4);
        const size = (0.7 + 1.9 * depth) * p.p;
        const a = (0.25 + 0.75 * depth) * wob;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
        if (depth > 0.72) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.12})`;
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={640}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  );
}
