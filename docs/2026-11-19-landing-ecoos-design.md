# Landing ECOOS Company v2 — design

## Por quê
A v1 ficou com cara de genérica (template escuro com brilho roxo e cartões). O Eduardo escolheu a direção **D · Manifesto** entre 7 rascunhos: quase só tipografia, preto absoluto, a frase da bio como hero.

## Público e ação
- Empresas em geral (os cases são de lojistas).
- Ação única: **Agendar uma conversa** → constante `FORM_URL` (placeholder até existir o link do formulário da Afluai).

## Metas / não-metas / anti-metas
- Meta: página com identidade própria da ECOOS, rápida e leve, que fecha no botão.
- Não-metas: formulário próprio, blog, analytics, deploy.
- Anti-metas: cara de template SaaS; vídeo tocando sozinho; animação travando (GSAP, `backdrop-filter`, blur animado); fala atribuída a quem não disse; material da Afluai apresentado como trabalho da ECOOS fora da seção da Afluai.

## Abordagens
- **Next.js + Tailwind, export estático** — escolhida pelo Eduardo. Sem o kit do design-taste (ele proíbe roxo e foi parte da cara genérica). Animação só em CSS.
- HTML + CSS puro: mais leve; descartado pelo Eduardo.

## Visual
- Fundo `#050307`, texto branco, cinza `#b9b1c6`.
- Títulos: **Anton** em caixa alta, gigantes. Texto: **Archivo**.
- Degradê `#4d4dff → #d84dff` só em palavras-chave e no botão principal.
- Seção Afluai no azul dela (design system da Afluai): fundo `#040A18`, `#0A71FF`, `#00B0FF`, `#00DFFF`.

## Seções (de cima para baixo)
1. **Hero:** “Não oferecemos ~~serviços~~. Entregamos resultados.” + linha de apoio + botão. Ao lado, a logo oficial em **3D sólido e parada** (19/11, escolha do Eduardo entre vários rascunhos; ele não quis animação nem moldura): vetorizada de `material/logo` (biolink da Ecoos), 26 camadas empilhadas em Z, frente com o degradê e lateral roxa, ângulo fixo. Sem JS, sem borda nem fundo na coluna.
2. **Serviços:** lista grande 01–04, a foto ao lado troca no hover/foco/toque: Tráfego pago → mesa 1; CRM → mesa 2; Treinamento comercial → retrato roxo; SEO → terno (ensaio dos posts).
3. **Caso G10 Veículos:** “Anunciada às 23h → 13h. Vendida.” + quadro do vídeo da G10.
4. **Números:** +70 empresas aceleradas · meta 100 · super meta 120 batida no dia 26.
5. **Afluai (azul):** curta. “Afluai, o CRM da Ecoos Growth: a IA atende no WhatsApp e no Instagram e passa para o vendedor.” Cita os últimos vídeos: Nivelo iPhone (75 → 102 aparelhos), 091 Fone (implantação) e o encontro Norte das Vendas no Pemanet. Cartões com capa; o vídeo só toca no clique.
6. **Clientes:** duas falas reais de lojistas (“Eu pagava agência, mas nunca tinha recebido esse tipo de acompanhamento.” / “O trabalho é excelente. As vendas aumentaram.”), vídeo no clique.
7. **Time ECOOS 💜:** foto do time, palestra, poltrona, treinamento, campanhas.
8. **Fechamento:** “Pare de perder vendas.” + botão. Rodapé com Instagram.

## Movimento
- Só CSS: entrada do hero uma vez no carregamento, troca de foto dos serviços (crossfade ~200ms), sublinhados e botões no hover.
- `prefers-reduced-motion`: tudo parado.
- Nenhum vídeo toca sozinho; vídeos com `preload="none"`.

## Celular
- Hero: texto, depois a foto. Serviços: foto acima da lista, troca ao tocar. Números empilham. Cartões de vídeo dois por linha.

## Fica para o construtor
Espaçamentos exatos, recortes finais das fotos, textos de apoio curtos dentro do tom acima.
