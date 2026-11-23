"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { base } from "./base";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { t: "Tráfego pago", d: "Anúncio no Instagram e no Google que filtra o curioso antes do atendimento.", img: "/img/svc-trafego.webp", video: "/video/svc-trafego.mp4" },
  { t: "CRM", d: "Todo lead no funil, com follow-up na hora certa e nenhum cliente esquecido.", img: "/img/svc-crm.webp", video: "/video/svc-crm.mp4" },
  { t: "Treinamento comercial", d: "Roteiro e prática para o time responder rápido e fechar sem baixar preço.", img: "/img/svc-treinamento.webp", video: "/video/svc-treinamento.mp4" },
  { t: "SEO", d: "Site e perfil achados por quem já procura o que a sua empresa vende.", img: "/img/svc-seo.webp", video: "/video/svc-seo.mp4" },
];

// A foto ao lado troca pelo serviço em foco: rolagem, teclado (Tab), clique ou toque.
export default function Services() {
  const [on, setOn] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const pic = useRef<HTMLDivElement>(null);
  const shown = useRef(0);
  const z = useRef(1);
  const [vis, setVis] = useState(false);

  // Troca: a foto nova vai pra cima e entra com um corte da esquerda pra direita e um leve zoom.
  useEffect(() => {
    if (on === shown.current) return;
    shown.current = on;
    const img = pic.current!.children[on];
    gsap.set(img, { zIndex: ++z.current });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(img, { clipPath: "inset(0 100% 0 0)", scale: 1.12 },
      { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.6, ease: "power3.out", overwrite: true });
  }, [on]);

  // Rolagem: a seção trava (pin) e cada 1/3 de tela rolado avança um serviço.
  useEffect(() => {
    const svc = root.current!;
    const imgs = pic.current!.children;
    const n = services.length;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: svc,
        pin: true,
        // centralizada; se não couber na tela, trava pelo topo
        start: () => (svc.offsetHeight > innerHeight ? "top top" : "center center"),
        end: () => `+=${(innerHeight / 3) * n}`,
        onUpdate: (st) => setOn(Math.min(n - 1, Math.floor(st.progress * n))),
      });
    });
    return () => { ctx.revert(); gsap.killTweensOf(imgs); };
  }, []);

  // Vídeo: só o do serviço em foco toca, e só com a seção na tela (preload="none": nada baixa antes).
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting));
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    [...pic.current!.children].forEach((el, i) => {
      if (!(el instanceof HTMLVideoElement)) return;
      if (i === on && vis && !still) el.play().catch(() => {}); // autoplay bloqueado: fica o poster
      else el.pause();
    });
  }, [on, vis]);

  return (
    <div className="svc" ref={root}>
      <ol className="svc__list">
        {services.map((s, i) => (
          <li key={s.t}>
            <button
              type="button"
              className="svc__item"
              aria-pressed={on === i}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
            >
              <span className="svc__n">0{i + 1}</span>
              <span className="svc__t display">{s.t}</span>
              <span className="svc__d">{s.d}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="svc__pic" ref={pic}>
        {services.map((s, i) =>
          s.video ? (
            <video key={s.img} src={base + s.video} poster={base + s.img} muted loop playsInline preload="none" aria-hidden="true" />
          ) : (
            <img key={s.img} src={base + s.img} alt="" loading={i ? "lazy" : undefined} />
          ),
        )}
      </div>
    </div>
  );
}
