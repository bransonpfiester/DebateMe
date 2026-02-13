"use client";

import { useEffect, useRef, useCallback } from "react";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const stateRef = useRef({ w: 0, h: 0, t: 0, dpr: 1 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    stateRef.current.w = rect.width;
    stateRef.current.h = rect.height;
    stateRef.current.dpr = dpr;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Store context in a ref so the draw closure always has it
    const c = context;

    // Initial resize — use rAF to ensure layout is complete
    requestAnimationFrame(() => {
      resize();

      // Start drawing after dimensions are set
      function draw() {
        const { w, h, t } = stateRef.current;

        if (w === 0 || h === 0) {
          resize();
          animationRef.current = requestAnimationFrame(draw);
          return;
        }

        c.clearRect(0, 0, w, h);

        // Center the vortex upper-right
        const cx = w * 0.62;
        const cy = h * 0.32;
        const maxR = Math.max(w, h) * 0.72;
        const rings = 70;

        for (let i = 0; i < rings; i++) {
          const ratio = i / rings;
          const r = ratio * maxR;

          // Organic wobble — outer rings wobble more
          const wobX =
            Math.sin(t * 0.006 + i * 0.12) * (6 + i * 0.55);
          const wobY =
            Math.cos(t * 0.005 + i * 0.1) * (4 + i * 0.35);
          const rot = 0.04 * Math.sin(t * 0.002 + i * 0.04);

          c.beginPath();
          c.ellipse(
            cx + wobX,
            cy + wobY,
            Math.max(r, 1),
            Math.max(r * 0.82, 1),
            rot,
            0,
            Math.PI * 2
          );

          // Subtle holographic hue shift
          const hue = (180 + i * 4.5 + t * 0.04) % 360;
          const sat = 15 + ratio * 30;
          const lum = 78 - ratio * 18;
          const alpha = 0.08 + ratio * 0.22;

          c.strokeStyle = `hsla(${hue}, ${sat}%, ${lum}%, ${alpha})`;
          c.lineWidth = 1.1;
          c.stroke();
        }

        stateRef.current.t = t + 1;
        animationRef.current = requestAnimationFrame(draw);
      }

      draw();
    });

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
