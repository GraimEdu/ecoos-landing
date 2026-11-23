import type { CSSProperties } from "react";
import Logo3D from "./logo-3d";
import Services from "./services";
import SoloVideo from "./solo-video";
import Strike from "./strike";
import Count from "./count";
import Chars from "./chars";
import Motion from "./motion";
import { base } from "./base";
import Fab from "./fab";

// Placeholder: trocar pelo link do formulário da Afluai quando ele existir.
const FORM_URL = "#";
const CTA = "Agendar uma conversa";
// Publicação da G10 no Instagram (abre no 2º item do carrossel).
const G10_URL = "https://www.instagram.com/p/DdKEzwEibzB/?img_index=2";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const aflVideos = [
  { id: "afl-nivelo", t: "Nivelo iPhone", who: "Vinícius, dono · Belém-PA", d: "A loja travava em 75 a 80 aparelhos por mês. Com a Afluai no atendimento e o time Ecoos junto: 102." },
  { id: "afl-091", t: "091 Fone", who: "Léo, da 091 Fone", d: "Implantação da Afluai na loja: conversas acompanhadas, retornos automáticos, nenhum cliente sem resposta." },
  { id: "afl-norte", t: "Norte das Vendas", who: "Encontro do Grupo Norte, no Pemanet", d: "A Afluai apresentada para empresários no encontro do Grupo Norte." },
];

const deps = [
  { id: "depo-lojista", poster: "lojista", q: "“Eu pagava agência, mas nunca tinha recebido esse tipo de acompanhamento.”" },
  { id: "depo-lojista2", poster: "lojista2", q: "“O trabalho é excelente. As vendas aumentaram.”" },
];

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="top">
          <a className="top__logo" href="#top"><img src={base + "/logo.png"} alt="" width={38} height={26} />Ecoos Company</a>
          <nav aria-label="Principal">
            <a href="#servicos">Serviços</a>
            <a href="#resultados">Resultados</a>
            <a href="#afluai">Afluai</a>
            <a href="#clientes">Clientes</a>
          </nav>
          <a className="btn" href={FORM_URL}>{CTA}</a>
        </div>
        <div className="hero__text">
          <h1 className="display" id="top">
            <span className="rise" style={i(0)}><Chars>Não oferecemos</Chars></span>
            <span className="rise" style={i(1)}><Strike>serviços</Strike><Chars>.</Chars></span>
            <span className="rise" style={i(2)}><Chars>Entregamos</Chars></span>
            <span className="rise" style={i(3)}><span className="grad">resultados</span>.</span>
          </h1>
          <div className="hero__foot rise" style={i(5)}>
            <p className="muted">Tráfego pago, CRM, treinamento comercial e SEO para empresas que querem vender mais. Mais de 70 já aceleradas.</p>
            <a className="btn btn--fill" href={FORM_URL}>{CTA} →</a>
          </div>
        </div>
        <div className="hero__logo">
          <Logo3D />
        </div>
      </header>

      <main>
        <section className="sec" id="servicos" aria-labelledby="servicos-h">
          <div className="wrap">
            <div className="sec__head">
              <h2 className="tag" id="servicos-h">O que a <b>Ecoos</b> faz</h2>
              <span className="sec__num">02</span>
            </div>
            <Services />
          </div>
        </section>

        <section className="sec" id="resultados" aria-labelledby="g10-h">
          <div className="wrap case">
            <div>
              <span className="tag">Caso <b>G10 Veículos</b></span>
              <h2 className="display" id="g10-h" style={{ marginTop: 14 }}>Anunciada às</h2>
              <p className="case__clock display" aria-label="23 horas, vendida às 13 horas">23h <i>→</i> <span className="grad">13h</span></p>
              <h2 className="display">Vendida.</h2>
              <p className="muted">A Ecoos anunciou uma moto da G10 Veículos às 23h. Por volta das 13h do dia seguinte ela já estava vendida.</p>
            </div>
            <div className="case__pic">
              <img src={base + "/img/g10.webp"} alt="Dono da G10 Veículos em chamada de vídeo com a equipe da Ecoos" width={720} height={540} loading="lazy" />
              <a className="btn case__post" href={G10_URL} target="_blank" rel="noopener noreferrer" aria-label="Ver a publicação da G10 no Instagram">↗</a>
            </div>
          </div>
        </section>

        <div className="nums">
          <div><b className="display"><Count to={70} prefix="+" /></b><p>empresas aceleradas pela Ecoos</p></div>
          <div><b className="display"><Count to={100} /></b><p>aparelhos: a meta do mês de uma loja cliente</p></div>
          <div><b className="display grad"><Count to={120} /></b><p>aparelhos: a super meta, batida no dia 26</p></div>
        </div>

        <section className="sec afl" id="afluai" aria-labelledby="afluai-h">
          <div className="wrap">
            <div className="afl__head">
              <div>
                <span className="tag"><b>Afluai</b> + Ecoos</span>
                <h2 className="display" id="afluai-h"><span>Afluai</span>, o CRM da Ecoos Growth</h2>
              </div>
              <p>
                A IA atende o cliente no WhatsApp e no Instagram, na mesma conversa, e passa para o vendedor quando a
                venda pede. <a className="afl__link" href="https://afluai.com.br">Conhecer a Afluai</a>
              </p>
            </div>
            <div className="afl__vids">
              {aflVideos.map((v) => (
                <article className="vcard" key={v.id}>
                  <video src={`${base}/video/${v.id}.mp4`} poster={`${base}/img/${v.id}.webp`} controls playsInline preload="none" aria-label={`Vídeo: ${v.t}`} />
                  <h3 className="display">{v.t}</h3>
                  <span className="who">{v.who}</span>
                  <p>{v.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="clientes" aria-labelledby="clientes-h">
          <div className="wrap">
            <div className="sec__head">
              <h2 className="tag" id="clientes-h">Quem é <b>cliente</b> fala</h2>
              <span className="sec__num">05</span>
            </div>
            <div className="deps">
              {deps.map((d) => (
                <figure className="dep" key={d.id}>
                  <video src={`${base}/video/${d.id}.mp4`} poster={`${base}/img/${d.poster}.webp`} controls playsInline preload="none" aria-label="Vídeo do depoimento" />
                  <div>
                    <blockquote className="display">{d.q}</blockquote>
                    <cite>Lojista, cliente da Ecoos</cite>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="time-h">
          <div className="wrap">
            <div className="sec__head"><h2 className="tag" id="time-h">Time <b>Ecoos</b> 💜</h2></div>
            <div className="team">
              <img src={base + "/img/time.webp"} alt="Equipe da Ecoos reunida no escritório, a maioria de camisa roxa" loading="lazy" />
              <img src={base + "/img/palestra.webp"} alt="Taric Couto, da Ecoos, falando num evento, com a marca no telão" loading="lazy" />
              <img src={base + "/img/lancamento.webp"} alt="Renato Garcia, da Ecoos, de camisa polo preta trabalhando no computador" loading="lazy" />
              <img src={base + "/img/treinamento.webp"} alt="Adriano Andrade, da Ecoos, de óculos e camisa polo preta, sorrindo" loading="lazy" />
              <img src={base + "/img/estrategia.webp"} alt="Integrante da Ecoos montando campanhas no computador" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="sec close" aria-labelledby="close-h">
          <div className="wrap">
            <h2 className="display" id="close-h"><Chars>Pare de</Chars> <span className="grad">perder vendas</span>.</h2>
            <div className="close__row">
              <p className="muted">Numa conversa a gente olha seus números e mostra onde a venda está escapando.</p>
              <a className="btn btn--fill" href={FORM_URL}>{CTA} →</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>© 2026 Ecoos Company</span>
        <a href="https://www.instagram.com/ecooscompany/">Instagram</a>
      </footer>
      <Fab href={FORM_URL}>{CTA} →</Fab>
      <SoloVideo />
      <Motion />
    </>
  );
}
