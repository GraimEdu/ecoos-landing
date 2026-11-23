// Tela de carregamento (.pre em page.tsx, CSS em globals.css): resolve quando a logo acaba de encher.
// Sem a tela (movimento reduzido) ou com a animação cancelada, resolve na hora.
export const preFilled = () =>
  Promise.resolve(document.querySelector(".pre__level")?.getAnimations()[0]?.finished).then(() => {}, () => {});
