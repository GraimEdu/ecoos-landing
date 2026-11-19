"use client";

import { useEffect, useRef } from "react";

// Número que conta de 0 até `to` uma vez, quando aparece na tela. Sem JS ou com movimento reduzido, mostra o valor final.
export default function Count({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = prefix + 0;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let t0 = 0;
      const tick = (t: number) => {
        t0 ||= t;
        const p = Math.min(1, (t - t0) / 1400);
        el.textContent = prefix + Math.round(to * (1 - (1 - p) ** 3)); // desacelera no fim
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); el.textContent = prefix + to; };
  }, [to, prefix]);
  return <span ref={ref}>{prefix}{to}</span>;
}
