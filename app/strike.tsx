"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Chars from "./chars";

// Palavra riscada do hero: depois que as letras do título entram (motion.tsx), a linha corta da esquerda pra direita e a palavra apaga.
// Estado inicial e final no CSS (.hero h1 s); com movimento reduzido fica direto no final.
export default function Strike({ children }: { children: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const s = ref.current!;
      gsap.timeline({ delay: 1.2 })
        .to(s.lastElementChild, { scaleX: 1, duration: 0.35, ease: "power3.inOut" })
        .to(s, { color: "#3b3446", duration: 0.3, ease: "power1.out" }, "-=0.15");
    });
    return () => mm.revert();
  }, []);
  return <s ref={ref}><Chars>{children}</Chars><span aria-hidden="true" /></s>;
}
