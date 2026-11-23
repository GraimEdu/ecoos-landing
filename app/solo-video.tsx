"use client";

import { useEffect } from "react";

// Só um vídeo tocando por vez: o "play" não sobe na árvore, então escuta na captura.
// Só vídeo com controles (escolha da pessoa) pausa os outros; o loop decorativo dos serviços não.
export default function SoloVideo() {
  useEffect(() => {
    const onPlay = (e: Event) => {
      if (!(e.target as HTMLVideoElement).controls) return;
      document.querySelectorAll("video").forEach((v) => { if (v !== e.target) v.pause(); });
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);
  return null;
}
