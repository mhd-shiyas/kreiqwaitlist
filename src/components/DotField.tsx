"use client";

import { useEffect, useRef } from "react";

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Full-size canvas that renders a grid of dots.
 * Dots within 130px of the cursor repel with spring-back physics.
 * Mount this inside a `relative overflow-hidden` section — it fills it completely.
 */
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Config ────────────────────────────────────────────────────────
    const COLS = 34;
    const ROWS = 28;
    const DOT_RADIUS = 1.4;
    const DOT_COLOR = "rgba(0,64,255,0.10)";
    const REPEL_RADIUS = 130;
    const REPEL_STRENGTH = 1.4;
    const SPRING_K = 0.048;
    const DAMPING = 0.82;

    let animId: number;
    const mouse = { x: -9999, y: -9999 };
    let dots: Dot[] = [];

    // ── Build dots ────────────────────────────────────────────────────
    const buildDots = () => {
      dots = [];
      const gapX = canvas.width / COLS;
      const gapY = canvas.height / ROWS;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const ox = gapX * c + gapX / 2;
          const oy = gapY * r + gapY / 2;
          dots.push({ originX: ox, originY: oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };

    // ── Resize handler ────────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildDots();
    };

    // ── Mouse tracking (global so pointer-events-none canvas still reacts) ─
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // ── Animation loop ────────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          d.vx -= (dx / dist) * force;
          d.vy -= (dy / dist) * force;
        }

        // Spring back to origin
        d.vx += (d.originX - d.x) * SPRING_K;
        d.vy += (d.originY - d.y) * SPRING_K;

        // Damping
        d.vx *= DAMPING;
        d.vy *= DAMPING;

        // Update position
        d.x += d.vx;
        d.y += d.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLOR;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    // ── Init ─────────────────────────────────────────────────────────
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
