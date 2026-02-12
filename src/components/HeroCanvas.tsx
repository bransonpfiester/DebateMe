"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number, h: number, t = 0, dpr: number;
    let animationId: number;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.62;
      const cy = h * 0.32;
      const maxR = Math.max(w, h) * 0.72;
      const rings = 70;

      for (let i = 0; i < rings; i++) {
        const ratio = i / rings;
        const r = ratio * maxR;

        const wobX = Math.sin(t * 0.006 + i * 0.12) * (6 + i * 0.55);
        const wobY = Math.cos(t * 0.005 + i * 0.1) * (4 + i * 0.35);
        const rot = 0.04 * Math.sin(t * 0.002 + i * 0.04);

        ctx.beginPath();
        ctx.ellipse(
          cx + wobX,
          cy + wobY,
          Math.max(r, 1),
          Math.max(r * 0.82, 1),
          rot,
          0,
          Math.PI * 2
        );

        const hue = (180 + i * 4.5 + t * 0.04) % 360;
        const sat = 15 + ratio * 30;
        const lum = 78 - ratio * 18;
        const alpha = 0.08 + ratio * 0.22;

        ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${lum}%, ${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      t++;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
