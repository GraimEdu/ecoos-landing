import { Fragment } from "react";

// Quebra o texto em palavras (.w) e letras (.ch) já no HTML, pro GSAP animar letra a letra sem reescrever o DOM.
export default function Chars({ children }: { children: string }) {
  return children.split(" ").map((w, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="w">{[...w].map((c, j) => <span className="ch" key={j}>{c}</span>)}</span>
    </Fragment>
  ));
}
