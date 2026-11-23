"use client";

import { useEffect, useState, type ReactNode } from "react";

// Botão flutuante "Agendar uma conversa": aparece depois que o hero sai da tela e some no fechamento (que já tem o botão grande).
export default function Fab({ href, children }: { href: string; children: ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero")!;
    const close = document.querySelector(".close")!;
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setOn(!seen.get(hero) && !seen.get(close));
    });
    io.observe(hero);
    io.observe(close);
    return () => io.disconnect();
  }, []);
  // escondido: fora do Tab e dos leitores de tela
  return (
    <a className="btn btn--fill fab" href={href} data-on={on || undefined} aria-hidden={!on} tabIndex={on ? undefined : -1}>
      {children}
    </a>
  );
}
