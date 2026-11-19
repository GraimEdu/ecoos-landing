"use client";

import { useEffect } from "react";

// Só um vídeo tocando por vez: o "play" não sobe na árvore, então escuta na captura.
export default function SoloVideo() {
  useEffect(() => {
    const onPlay = (e: Event) => {
      document.querySelectorAll("video").forEach((v) => { if (v !== e.target) v.pause(); });
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);
  return null;
}
