import type { CSSProperties } from "react";
import { mark } from "./logo-paths";

// Logo oficial (vetorizada) em 3D sólido e parado: 26 camadas da mesma forma empilhadas em Z.
// A de frente leva o degradê da marca; as de trás, roxos mais escuros, formam a espessura.
const markD = mark.paths.map((p) => p.d).join(" ");
const { x, y } = mark.paths[0];
const LAYERS = 26;

export default function Logo3D() {
  return (
    <div className="logo3d" role="img" aria-label="Logo da Ecoos">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <path id="ecoos-mark" transform={`translate(${x} ${y})`} d={markD} fillRule="evenodd" />
          <linearGradient id="ecoos-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1414ff" />
            <stop offset="1" stopColor="#c800ff" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: LAYERS }, (_, n) => {
        const i = LAYERS - 1 - n; // de trás para a frente
        const k = 1 - i / LAYERS;
        const fill = i === 0 ? "url(#ecoos-grad)" : `hsl(${250 + k * 35} 75% ${18 + k * 20}%)`;
        return (
          <svg key={i} viewBox={`0 0 ${mark.w} ${mark.h}`} style={{ "--z": i } as CSSProperties} aria-hidden="true">
            <use href="#ecoos-mark" fill={fill} />
          </svg>
        );
      })}
    </div>
  );
}
