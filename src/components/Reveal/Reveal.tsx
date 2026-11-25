"use client"; // usa il browser (scroll, misure): non può girare sul server

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// I plugin di GSAP vanno "registrati" una volta prima dell'uso.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// COMPARSA ALLO SCORRIMENTO.
// Reveal è un contenitore: quando entra nello schermo anima i discendenti
// marcati con un attributo data-reveal:
//   data-reveal="mask" -> sale da sotto (il genitore lo ritaglia: "maschera")
//   data-reveal="fade" -> dissolvenza + piccolo scorrimento verso l'alto
//   data-reveal="tiles" -> i figli (tessere) spariscono in ordine sparso
//   data-reveal="zoom" -> parte un po' ingrandito e torna a misura
//
// L'HTML resta quello del server, già visibile: è GSAP a nascondere e poi
// mostrare. Quindi senza JavaScript il testo si legge comunque.

interface RevealProps {
  children: ReactNode;
  className?: string;
  // true: l'animazione parte al caricamento della pagina invece che allo
  // scorrimento (serve al blocco d'apertura, che è già sullo schermo).
  onLoad?: boolean;
  // Un'ancora (es. "#top"): quando si clicca un link che porta lì, il
  // mosaico (tiles + zoom) viene rifatto all'arrivo in cima alla pagina.
  replayOn?: string;
}

export default function Reveal({
  children,
  className,
  onLoad = false,
  replayOn,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  // useGSAP = useEffect pensato per GSAP: quando il componente sparisce
  // annulla da solo le animazioni create qui dentro.
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // Già ben dentro lo schermo al caricamento (es. link diretto a
      // /#contatti)? La prima volta l'animazione va saltata: farebbe solo
      // un "lampo" di testo che sparisce e ricompare.
      const alreadyInView =
        !onLoad && el.getBoundingClientRect().top < window.innerHeight * 0.5;

      // matchMedia: le animazioni esistono SOLO per chi non ha chiesto di
      // ridurre il movimento. Per gli altri non succede nulla.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const masks = el.querySelectorAll('[data-reveal="mask"]');
        const fades = el.querySelectorAll('[data-reveal="fade"]');

        // Timeline = sequenza di animazioni. ScrollTrigger la fa partire
        // quando il bordo alto del contenitore arriva al 70% dello schermo.
        // toggleActions = cosa fare in 4 momenti: entro scendendo, esco dal
        // fondo, rientro risalendo, esco dall'alto risalendo.
        // "play none none reset": parte quando arrivo scendendo e si azzera
        // solo quando torno SOPRA la sezione, così al prossimo passaggio
        // riparte. Risalendo da sotto il testo resta fermo e leggibile.
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          // Senza scrollTrigger una timeline parte subito.
          scrollTrigger: onLoad
            ? undefined
            : {
                trigger: el,
                start: "top 70%",
                toggleActions: "play none none reset",
              },
        });

        // from(): parte dai valori indicati e arriva allo stato naturale.
        if (masks.length) {
          tl.from(masks, { yPercent: 110, duration: 1.2 }, 0);
        }
        if (fades.length) {
          tl.from(
            fades,
            {
              opacity: 0,
              y: 40,
              duration: 1,
              stagger: 0.15, // uno dopo l'altro, a 0.15s di distanza
              clearProps: "opacity,transform", // a fine corsa, ripulisce
            },
            0.15, // parte poco dopo il titolo
          );
        }

        // MOSAICO: le tessere che coprono una foto spariscono in ordine
        // sparso, mentre la foto sotto (zoom) torna alla sua misura.
        // stagger con "grid" e from: "random" = GSAP distribuisce i ritardi
        // sulla griglia; amount = tempo totale tra la prima e l'ultima.
        // A fine dissolvenza GSAP "lascia" le tessere (clearProps toglie lo
        // stile che aveva scritto) e marca la griglia con data-revealed:
        // da lì in poi comanda il CSS, che le tiene trasparenti
        // (vedi Hero.module.scss).
        const tileGrids = el.querySelectorAll<HTMLElement>(
          '[data-reveal="tiles"]',
        );
        const zooms = el.querySelectorAll('[data-reveal="zoom"]');

        // Il mosaico è una piccola timeline a sé, costruita da una funzione:
        // così posso crearne una NUOVA ogni volta che va rifatto (replayOn).
        // fromTo(): dichiaro sia la partenza (tessere piene) sia l'arrivo.
        const buildMosaic = () => {
          const mosaic = gsap.timeline();
          tileGrids.forEach((grid) => {
            const cols = Number(grid.dataset.cols) || 1;
            // Via il marchio: finché anima GSAP, il CSS non deve intervenire.
            delete grid.dataset.revealed;
            mosaic.fromTo(
              grid.children,
              { opacity: 1 },
              {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                onComplete: () => {
                  grid.dataset.revealed = "";
                  gsap.set(grid.children, { clearProps: "opacity" });
                },
                stagger: {
                  amount: 0.9,
                  from: "random",
                  grid: [grid.children.length / cols, cols],
                },
              },
              0,
            );
          });
          if (zooms.length) {
            mosaic.fromTo(
              zooms,
              { scale: 1.15 },
              { scale: 1, duration: 1.8, ease: "power3.out" },
              0,
            );
          }
          return mosaic;
        };
        if (tileGrids.length || zooms.length) tl.add(buildMosaic(), 0.3);

        // Al caricamento il CSS tiene nascosti questi elementi per evitare
        // un "lampo" (vedi Hero.module.scss): ora che GSAP li controlla,
        // li rendiamo di nuovo visibili.
        if (onLoad) gsap.set([...masks, ...fades], { visibility: "visible" });

        // Sezione già a schermo: porto subito la timeline alla fine.
        if (alreadyInView) tl.progress(1);

        // RIPETIZIONE: al clic su un link verso replayOn (es. "torna su")
        // preparo un mosaico nuovo, IN PAUSA: le tessere tornano subito
        // piene (la foto è fuori schermo, non si vede). Poi aspetto che lo
        // scorrimento arrivi in cima e solo allora lo faccio partire.
        let replay: gsap.core.Timeline | null = null;
        const playAtTop = () => {
          if (window.scrollY > window.innerHeight * 0.15) return;
          window.removeEventListener("scroll", playAtTop);
          replay?.play();
        };
        const onClick = (event: MouseEvent) => {
          const target = event.target as Element | null;
          // closest: risale dal punto cliccato fino al link che lo contiene.
          // href$= : l'indirizzo FINISCE con "#top" (vale anche "/#top").
          if (!target?.closest(`a[href$="${replayOn}"]`)) return;
          replay?.kill();
          replay = buildMosaic().pause();
          window.addEventListener("scroll", playAtTop, { passive: true });
          playAtTop(); // già in cima? parte subito
        };
        if (replayOn && tileGrids.length) {
          document.addEventListener("click", onClick);
        }

        // Pulizia: quando le animazioni vengono annullate, via il marchio,
        // i listener e l'eventuale ripetizione in corso.
        return () => {
          document.removeEventListener("click", onClick);
          window.removeEventListener("scroll", playAtTop);
          replay?.kill();
          tileGrids.forEach((grid) => delete grid.dataset.revealed);
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [onLoad, replayOn] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
