"use client";

import { useEffect, useRef, useCallback } from "react";

interface CircuitTraceProps {
  className?: string;
  paused?: boolean;
  speedMultiplier?: number;
}

interface Trace {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  length: number;
}

export function CircuitTrace({ className = "", paused = false, speedMultiplier = 1 }: CircuitTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const speedRef = useRef(speedMultiplier);
  const animationIdRef = useRef<number>(0);

  // Keep refs in sync without restarting the effect
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const gridSize = 30;
    const traces: Trace[] = [];
    const maxTraces = 15;

    function createTrace(): Trace {
      const startX =
        Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const startY =
        Math.floor(Math.random() * (height / gridSize)) * gridSize;
      const points = [{ x: startX, y: startY }];
      const segments = Math.floor(Math.random() * 8) + 4;

      let currentX = startX;
      let currentY = startY;
      let lastDir = -1;

      for (let i = 0; i < segments; i++) {
        const dirs = [0, 1, 2, 3].filter((d) => d !== (lastDir + 2) % 4);
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const steps = Math.floor(Math.random() * 5) + 2;

        switch (dir) {
          case 0: currentX += steps * gridSize; break;
          case 1: currentY += steps * gridSize; break;
          case 2: currentX -= steps * gridSize; break;
          case 3: currentY -= steps * gridSize; break;
        }

        currentX = Math.max(0, Math.min(width, currentX));
        currentY = Math.max(0, Math.min(height, currentY));
        points.push({ x: currentX, y: currentY });
        lastDir = dir;
      }

      return {
        points,
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        length: 0.15 + Math.random() * 0.15,
      };
    }

    for (let i = 0; i < maxTraces; i++) {
      const trace = createTrace();
      trace.progress = Math.random();
      traces.push(trace);
    }

    function getTotalLength(points: { x: number; y: number }[]) {
      let total = 0;
      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        total += Math.sqrt(dx * dx + dy * dy);
      }
      return total;
    }

    function draw() {
      if (!ctx || !canvas) return;

      if (!pausedRef.current) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
        ctx.fillRect(0, 0, width, height);

        for (let t = 0; t < traces.length; t++) {
          const trace = traces[t];
          trace.progress += trace.speed * speedRef.current;

          if (trace.progress > 1 + trace.length) {
            traces[t] = createTrace();
            continue;
          }

          const totalLen = getTotalLength(trace.points);
          const headDist = trace.progress * totalLen;
          const tailDist = (trace.progress - trace.length) * totalLen;

          let accumulated = 0;

          for (let i = 1; i < trace.points.length; i++) {
            const p1 = trace.points[i - 1];
            const p2 = trace.points[i];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const segLen = Math.sqrt(dx * dx + dy * dy);
            const segStart = accumulated;
            const segEnd = accumulated + segLen;

            if (segEnd > tailDist && segStart < headDist) {
              const clampStart = Math.max(tailDist, segStart);
              const clampEnd = Math.min(headDist, segEnd);

              const t1 = (clampStart - segStart) / segLen;
              const t2 = (clampEnd - segStart) / segLen;

              const x1 = p1.x + dx * t1;
              const y1 = p1.y + dy * t1;
              const x2 = p1.x + dx * t2;
              const y2 = p1.y + dy * t2;

              const headProximity =
                1 - (headDist - clampEnd) / (trace.length * totalLen);
              const alpha = Math.max(0.05, headProximity * 0.5);

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();

              if (
                Math.abs(clampEnd - segEnd) < 1 &&
                i < trace.points.length - 1
              ) {
                ctx.beginPath();
                ctx.arc(p2.x, p2.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 170, ${alpha})`;
                ctx.fill();
              }
            }

            accumulated += segLen;
          }

          if (headDist <= totalLen && headDist >= 0) {
            let acc = 0;
            for (let i = 1; i < trace.points.length; i++) {
              const p1 = trace.points[i - 1];
              const p2 = trace.points[i];
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const segLen = Math.sqrt(dx * dx + dy * dy);

              if (acc + segLen >= headDist) {
                const localT = (headDist - acc) / segLen;
                const hx = p1.x + dx * localT;
                const hy = p1.y + dy * localT;

                ctx.beginPath();
                ctx.arc(hx, hy, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0, 245, 160, 0.8)";
                ctx.fill();
                break;
              }
              acc += segLen;
            }
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 ${className}`}
    />
  );
}
