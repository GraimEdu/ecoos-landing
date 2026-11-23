"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Chars from "./chars";
import { preFilled } from "./pre";

// Palavra riscada do hero: depois que as letras do título entram (motion.tsx), a linha corta da esquerda pra direita e a palavra apaga.
// Estado inicial e final no CSS (.hero h1 s); com movimento reduzido fica direto no final.
export default function Strike({ children }: { children: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const s = ref.current!;
      // 1.4 = 0.2 da tela de carregamento subindo + 1.2 das letras entrando
      const cut = gsap.timeline({ paused: true })
        .to(s.lastElementChild, { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 1.4)
        .to(s, { color: "#3b3446", duration: 0.6, ease: "power1.out" }, "-=0.3");
      preFilled().then(() => cut.play());
    });
    return () => mm.revert();
  }, []);
  return <s ref={ref}><Chars>{children}</Chars><span aria-hidden="true" /></s>;
}
