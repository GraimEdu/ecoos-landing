# Landing ECOOS v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing da ECOOS no estilo Manifesto (direção D), em Next.js + Tailwind com export estático.

**Architecture:** Uma rota (`app/page.tsx`) com as 8 seções do spec; estilos em `app/globals.css` (Tailwind v4 com tokens `@theme`, sem preflight custom); a troca de foto dos serviços é o único JS (componente client `app/services.tsx`). Mídia em `public/img` e `public/video`, gerada do `material/` com ffmpeg.

**Tech Stack:** Next.js (create-next-app latest), React, TypeScript, Tailwind v4, `next/font` (Anton, Archivo), ffmpeg.

**Spec:** `docs/2026-11-19-landing-ecoos-design.md`

## Global Constraints

- Cores: fundo `#050307`, texto `#fff`, cinza `#b9b1c6`, degradê `#4d4dff → #d84dff` só em palavras-chave e no botão principal; seção Afluai `#040A18`, `#0A71FF`, `#00B0FF`, `#00DFFF`.
- Fontes: Anton (títulos, caixa alta), Archivo (texto).
- CTA único “Agendar uma conversa” → constante `FORM_URL = "#"` (placeholder).
- Animação só CSS; nada de GSAP, `backdrop-filter` ou blur animado; `prefers-reduced-motion` para tudo.
- Nenhum `<video autoplay>`; vídeos `preload="none"` e `controls`, um tocando por vez.
- Falas de cliente só as duas do spec, com atribuição “Lojista, cliente da Ecoos”.
- Material da Afluai só dentro da seção Afluai.
- Sem commits (pasta não é git).

## Review Focus

- Títulos gigantes em 390px e 320px: palavra longa (“TREINAMENTO COMERCIAL”, “RESULTADOS”) não pode estourar a largura → `document.documentElement.scrollWidth <= innerWidth`.
- Troca de foto dos serviços pelo teclado e por toque, não só hover → foco/clique numa linha troca a foto.
- Dar play num vídeo pausa os outros.
- Movimento reduzido: nada anima.
- Foto que falha ao carregar: nenhuma `img` com `naturalWidth === 0`.

---

### Task 1: Projeto e mídia

**Files:** Create: projeto Next na raiz; `public/img/*.webp`, `public/video/*.mp4`, `public/logo.png`.

- [ ] **Step 1:** `create-next-app` (TS, Tailwind, App Router, sem src, `--skip-install`) numa pasta temporária, copiar para a raiz, `npm install`; `next.config.ts` com `output: "export"`.
- [ ] **Step 2:** Gerar mídia: hero `taric.webp` (crop do `DT_fcpDARKu`), serviços `f-mesa1/f-mesa2/f-roxo/f-terno.webp`, `g10.webp`, clientes `lojista.webp`/`lojista2.webp` + vídeos `depo-lojista.mp4`/`depo-lojista2.mp4`, Afluai `afl-nivelo/afl-091/afl-norte` (capa + mp4 540p), time `time/palestra/lancamento/treinamento/estrategia.webp`. Reaproveitar os recortes já validados em `.superpowers/brainstorm/*/content`.
- [ ] **Step 3:** `npm run build` → Expected: build OK, pasta `out/` criada.

### Task 2: Página e estilo

**Files:** Create: `app/page.tsx`, `app/services.tsx`, `app/videos.tsx`; Modify: `app/layout.tsx`, `app/globals.css`.

**Interfaces:**
- `Services()` (client): lista 01–04 + foto; estado `active: number`, troca em `onMouseEnter`, `onFocus`, `onClick`.
- `VideoSoloGuard()` (client, retorna `null`): escuta `play` em todos os `video` e pausa os outros.

- [ ] **Step 1:** Escrever as 8 seções do spec com as cores e fontes das Global Constraints.
- [ ] **Step 2:** `npm run lint && npm run build` → Expected: sem erros.
- [ ] **Step 3:** Verificar no Chrome (1440 e 390): `scrollWidth <= innerWidth`; nenhuma imagem quebrada; nenhum vídeo tocando ao carregar; foco/clique numa linha de serviço troca a foto; play num vídeo pausa o outro.
- [ ] **Step 4:** Abrir no Chrome do Eduardo.
