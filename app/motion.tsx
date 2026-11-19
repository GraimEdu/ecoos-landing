"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Efeitos de rolagem da v2. Fica no fim da página: cria os gatilhos depois da trava dos serviços, de cima pra baixo.
// Com movimento reduzido nada roda e a página fica no estado final.
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero: letras sobem uma a uma; a linha do degradê entra inteira no fim.
      const lines = gsap.utils.toArray<HTMLElement>(".hero h1 .rise");
      lines.forEach((l) => (l.style.animation = "none"));
      gsap.timeline()
        .from(".hero h1 .ch", { yPercent: 110, opacity: 0, rotate: 8, duration: 0.7, ease: "power3.out", stagger: 0.03 })
        .from(lines[3], { yPercent: 60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.45");

      // Hero ao descer: o título sobe e apaga, a logo 3D gira.
      const heroOut = { trigger: ".hero", start: "top top", end: "bottom top" };
      gsap.to(".hero h1", { yPercent: -25, opacity: 0.15, ease: "none", scrollTrigger: { ...heroOut, scrub: true } });
      gsap.fromTo(".logo3d", { rotationY: -32, rotationX: 12 },
        { rotationY: 48, rotationX: -10, ease: "none", scrollTrigger: { ...heroOut, scrub: 0.6 } });

      // Caso G10: o relógio corre de 23h até 13h com a rolagem; a foto entra com um corte.
      const clock = document.querySelector<HTMLElement>(".case__clock .grad")!;
      const t = { h: 0 };
      clock.textContent = "23h";
      gsap.to(t, {
        h: 14, ease: "none",
        onUpdate: () => { clock.textContent = `${(23 + Math.round(t.h)) % 24}h`; },
        scrollTrigger: { trigger: ".case__clock", start: "top 85%", end: "top 35%", scrub: 0.4 },
      });
      const pic = { trigger: ".case__pic", start: "top 80%" };
      gsap.fromTo(".case__pic", { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut", scrollTrigger: pic });
      gsap.from(".case__pic img", { scale: 1.25, duration: 1.4, ease: "power3.out", scrollTrigger: pic });

      // Afluai: o fundo vira o azul da Afluai ao entrar e os vídeos chegam em cascata.
      gsap.fromTo(".afl", { backgroundColor: "#050307", borderTopColor: "rgba(10, 113, 255, 0)" },
        { backgroundColor: "#040a18", borderTopColor: "rgba(10, 113, 255, 1)", ease: "none",
          scrollTrigger: { trigger: ".afl", start: "top bottom", end: "top 30%", scrub: true } });
      gsap.from(".afl__vids .vcard", { y: 80, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: ".afl__vids", start: "top 80%" } });

      // Clientes: depoimentos deslizam, um de cada lado.
      gsap.utils.toArray<HTMLElement>(".dep").forEach((d, i) =>
        gsap.from(d, { x: i % 2 ? 120 : -120, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: d, start: "top 85%" } }));

      // Time: a seção trava e a fila de fotos corre na horizontal.
      const team = document.querySelector<HTMLElement>(".team")!;
      gsap.set(team, { overflow: "visible", width: "max-content" });
      gsap.set(team.closest("section"), { overflowX: "clip" }); // a fila não alarga a página (iPhone arrastaria pro lado)
      const dist = () => team.scrollWidth - team.parentElement!.clientWidth;
      gsap.to(team, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: team.closest("section"), pin: true, start: "top top", end: () => `+=${dist()}`, scrub: 0.5, invalidateOnRefresh: true },
      });

      // Fechamento: "Pare de perder vendas" acende letra a letra com a rolagem.
      gsap.fromTo(".close h2 .ch, .close h2 .grad", { opacity: 0.12 },
        { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ".close h2", start: "top 85%", end: "top 35%", scrub: true } });

      return () => {
        lines.forEach((l) => (l.style.animation = ""));
        clock.textContent = "13h";
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}
