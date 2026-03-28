"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";

const TOTAL_FRAMES = 120;

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${num}.jpg`;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // cover fit — sin barras negras
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);

    // Blue tint overlay — identidad Podium
    ctx.fillStyle = "rgba(0,56,168,0.22)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bottom fade → azul marino
    const bottomFade = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
    bottomFade.addColorStop(0, "rgba(6,14,28,0)");
    bottomFade.addColorStop(1, "rgba(6,14,28,0.95)");
    ctx.fillStyle = bottomFade;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Radial vignette edges
    const radGrad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.75
    );
    radGrad.addColorStop(0, "rgba(0,0,0,0)");
    radGrad.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    let loadedSoFar = 0;
    const imgs = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedSoFar++;
        setLoadedCount(loadedSoFar);
        if (loadedSoFar === TOTAL_FRAMES) { setIsLoaded(true); drawFrame(0); }
        if (i === 0 && img.complete) drawFrame(0);
      };
      img.onerror = () => {
        loadedSoFar++;
        setLoadedCount(loadedSoFar);
        if (loadedSoFar === TOTAL_FRAMES) setIsLoaded(true);
      };
      return img;
    });
    imagesRef.current = imgs;
    if (imgs[0].complete && imgs[0].naturalWidth > 0) drawFrame(0);
    return () => { };
  }, [drawFrame]);

  useEffect(() => {
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!sticky || !canvas) return;
    const resize = () => {
      canvas.width = sticky.offsetWidth;
      canvas.height = sticky.offsetHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(sticky);
    return () => observer.disconnect();
  }, [drawFrame]);

  useMotionValueEvent(frameIndex, "change", (v) => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(v)));
    currentFrameRef.current = clamped;
    if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => drawFrame(clamped));
  });

  const loadProgress = (loadedCount / TOTAL_FRAMES) * 100;

  return (
    <div ref={containerRef} style={{ height: "150vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky", top: 0,
          height: "100vh", width: "100%",
          overflow: "hidden",
          backgroundColor: "#060e1c",
        }}
      >
        {/* Canvas */}
        <motion.div style={{ position: "absolute", inset: 0, opacity: canvasOpacity, scale: canvasScale }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}
            aria-label="Animación Club Podium" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollOpacity, pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="w-px h-10 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 h-full"
              style={{ background: "linear-gradient(to bottom, transparent, #CCFF00)" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", color: "rgba(255,230,0,0.5)", letterSpacing: "0.3em" }}>
            SCROLL
          </p>
        </motion.div>

        {/* Loading bar */}
        {!isLoaded && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%`, backgroundColor: "#CCFF00" }}
              />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                {Math.round(loadProgress)}%
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}