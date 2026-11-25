"use client"; // ha uno stato (quale scheda è davanti) e ascolta mouse e tastiera

import gsap from "gsap";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import Button from "@/components/Button/Button";
import styles from "./Rotonda.module.scss";

// LA ROTONDA: una giostra 3D di immagini. Le schede stanno in cerchio,
// come i cavalli di una giostra vista dall'alto; girando l'anello, una
// scheda alla volta arriva davanti.
//
// È un "di più": tutti i contenuti stanno comunque nelle liste sotto.
// Per questo su mobile e con "riduci animazioni" viene nascosta (CSS).

export interface RotondaItem {
  id: string; // ancora della scheda completa, più in basso (#id)
  kind: string; // "Progetto" o "Contributo"
  title: string;
  meta: string; // anno o data
  detail: string; // riga tecnica: stack del progetto o sottotitolo
  image: StaticImageData;
}

interface RotondaProps {
  items: RotondaItem[];
  label: string; // nome per gli screen reader
  // id della sezione che segue: se c'è, in basso al centro compare
  // l'indicatore "Scorri" che porta lì.
  scrollTo?: string;
}

// Di quanti pixel va trascinato il mouse per passare alla scheda dopo.
const DRAG_STEP = 360;
// Sotto questa soglia è un clic, non un trascinamento.
const DRAG_THRESHOLD = 6;
// Slancio: quanti secondi di "corsa" restano dopo il rilascio.
const THROW = 0.3;

// Di quanti "pixel di rotella" serve per passare alla scheda dopo
// (uno scatto di rotella del mouse vale circa 100).
const WHEEL_STEP = 120;
// Dopo quanti millisecondi senza rotella l'anello si assesta.
const WHEEL_PAUSE = 160;

// Resto sempre positivo: in JavaScript -1 % 5 fa -1, a noi serve 4.
const mod = (n: number, m: number) => ((n % m) + m) % m;

// PROFONDITÀ di una scheda: 0 se è davanti, 1 se è lontana (da una
// scheda e mezza in poi). "p" è la posizione dell'anello, anche a metà
// tra due tacche: per questo la profondità cambia in modo continuo.
function depthAt(i: number, p: number, slots: number) {
  // Distanza sul cerchio: da 0 a metà giro, in entrambe le direzioni.
  const distance = Math.abs(mod(i - p + slots / 2, slots) - slots / 2);
  return Math.min(distance / 1.5, 1);
}

export default function Rotonda({ items, label, scrollTo }: RotondaProps) {
  const count = items.length;
  // Con poche schede il cerchio è "stretto" e quelle ai lati si vedono
  // di taglio. Mettendo la lista due volte il giro ha il doppio dei posti:
  // le vicine restano quasi di fronte. (Le immagini ripetute non pesano:
  // il browser le scarica una volta sola.)
  const cards = count < 8 ? [...items, ...items] : items;
  const slots = cards.length;
  const step = 360 / slots; // gradi tra una scheda e la successiva
  // Raggio del cerchio, in "larghezze di scheda": metà scheda divisa per
  // la tangente di metà angolo (trigonometria del poligono regolare).
  const radius = 0.5 / Math.tan(Math.PI / slots);

  // STATO (fa ridisegnare): solo ciò che cambia l'HTML.
  const [front, setFront] = useState(0); // posto che sta davanti
  const [dragging, setDragging] = useState(false);
  // L'indicatore "Scorri" sparisce quando il titolo della sezione
  // successiva entra nello schermo: a quel punto ha fatto il suo lavoro.
  const [cueHidden, setCueHidden] = useState(false);

  // APPUNTI (useRef: cambiano senza ridisegnare). La posizione dell'anello
  // cambia 60 volte al secondo: se fosse uno stato, React ridisegnerebbe
  // tutto a ogni fotogramma. La teniamo qui e la scriviamo noi nel CSS.
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ value: 0 }); // posizione attuale, in "tacche"
  const target = useRef(0); // tacca verso cui stiamo andando
  const press = useRef<{ x: number; value: number } | null>(null);
  const speed = useRef({ x: 0, time: 0, value: 0 }); // velocità del mouse
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = front % count; // contenuto mostrato nella didascalia
  const current = items[active];

  // Scrive la posizione nel CSS: l'angolo dell'anello e la profondità di
  // ogni scheda (--depth, che il CSS usa per sfocare e scurire). Poi, se
  // è cambiata la scheda davanti, aggiorna lo stato (solo allora React
  // ridisegna la didascalia).
  function apply() {
    const el = ring.current;
    if (!el) return;
    const p = pos.current.value;
    el.style.setProperty("--angle", `${-p * step}deg`);
    Array.from(el.children).forEach((card, i) => {
      (card as HTMLElement).style.setProperty(
        "--depth",
        depthAt(i, p, slots).toFixed(3),
      );
    });
    setFront(mod(Math.round(p), slots));
  }

  // Porta l'anello a una tacca. GSAP calcola i valori intermedi: parte
  // veloce e rallenta (power3.out), come una giostra che si ferma.
  function spinTo(to: number, duration = 1) {
    target.current = to;
    gsap.to(pos.current, {
      value: to,
      duration,
      ease: "power3.out",
      overwrite: true, // sostituisce l'animazione in corso, se c'è
      onUpdate: apply,
    });
  }

  // ---- Rotella del mouse / trackpad ----
  // Ogni movimento di rotella sposta un po' il traguardo (anche a metà
  // tra due tacche) e l'anello lo insegue. Quando la rotella si ferma,
  // l'anello si assesta sulla tacca più vicina.
  // useEffectEvent: una funzione "evento" che l'effetto qui sotto può
  // chiamare vedendo sempre i valori aggiornati, senza doversi rieseguire.
  const onWheel = useEffectEvent((e: WheelEvent) => {
    if (e.ctrlKey) return; // Ctrl + rotella è lo zoom del browser
    // Vale la direzione prevalente: verticale (rotella) o orizzontale
    // (due dita sul trackpad).
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const delta = e.deltaMode === 1 ? raw * 16 : raw; // righe -> pixel
    e.preventDefault(); // sulla scena la rotella gira la giostra, non la pagina

    target.current += delta / WHEEL_STEP;
    gsap.to(pos.current, {
      value: target.current,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
      onUpdate: apply,
    });

    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(
      () => spinTo(Math.round(target.current)),
      WHEEL_PAUSE,
    );
  });

  // L'ascoltatore della rotella va aggiunto "a mano": quelli di React
  // (onWheel nel JSX) sono "passivi" e non possono fermare lo scorrimento
  // della pagina. Con { passive: false } preventDefault funziona.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const handler = (e: WheelEvent) => onWheel(e);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // IntersectionObserver: il browser ci avvisa quando un elemento entra o
  // esce dallo schermo, senza dover controllare a ogni scroll. Osserviamo
  // il TITOLO della sezione di destinazione (h1 o h2).
  useEffect(() => {
    if (!scrollTo) return;
    const section = document.getElementById(scrollTo);
    const title = section?.querySelector("h1, h2") ?? section;
    if (!title) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Nascosto se il titolo è visibile, o se è già sopra lo schermo
      // (top < 0: l'abbiamo superato scorrendo). Torna se si risale.
      setCueHidden(entry.isIntersecting || entry.boundingClientRect.top < 0);
    });
    observer.observe(title);
    return () => observer.disconnect(); // pulizia quando si cambia pagina
  }, [scrollTo]);

  // Se il componente esce dalla pagina, ferma le animazioni rimaste.
  useEffect(() => {
    const position = pos.current;
    const timer = wheelTimer;
    return () => {
      gsap.killTweensOf(position);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Avanti / indietro di n tacche (anche a clic ripetuti: si sommano).
  const move = (n: number) => spinTo(Math.round(target.current) + n);

  // Va a un posto (o a un contenuto) per la via più breve sul cerchio.
  function shortest(diff: number, size: number) {
    if (diff > size / 2) return diff - size;
    if (diff < -size / 2) return diff + size;
    return diff;
  }
  const goToSlot = (i: number) => move(shortest(i - front, slots));
  const goToItem = (i: number) => move(shortest(i - active, count));

  // ---- Trascinamento con slancio ----
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return; // solo tasto sinistro / dito
    press.current = { x: e.clientX, value: pos.current.value };
    speed.current = { x: e.clientX, time: e.timeStamp, value: 0 };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!press.current) return;
    const dx = e.clientX - press.current.x;
    if (!dragging && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!dragging) {
      setDragging(true);
      gsap.killTweensOf(pos.current); // la mano prende il comando
      // "Cattura" il puntatore: continuiamo a ricevere i movimenti anche
      // se il mouse esce dall'area.
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    // Velocità del mouse (pixel al secondo), un po' "ammorbidita" facendo
    // la media con la misura precedente.
    const dt = e.timeStamp - speed.current.time;
    if (dt > 0) {
      const now = ((e.clientX - speed.current.x) / dt) * 1000;
      speed.current = {
        x: e.clientX,
        time: e.timeStamp,
        value: now * 0.7 + speed.current.value * 0.3,
      };
    }

    pos.current.value = press.current.value - dx / DRAG_STEP;
    apply();
  }

  function onPointerEnd(e: PointerEvent<HTMLDivElement>) {
    if (!press.current) return;
    press.current = null;
    if (!dragging) return;
    setDragging(false);

    // Se il mouse era fermo al momento del rilascio, niente slancio.
    const still = e.timeStamp - speed.current.time > 80;
    const velocity = still ? 0 : -speed.current.value / DRAG_STEP; // tacche/s
    // Dove arriverebbe continuando per THROW secondi; poi si assesta
    // sulla tacca più vicina (Math.round).
    const landing = Math.round(pos.current.value + velocity * THROW);
    spinTo(landing, 1.2);
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "ArrowRight") move(1);
    if (e.key === "ArrowLeft") move(-1);
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      className={styles.rotonda}
      aria-roledescription="carosello"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {/* La scena 3D è decorativa: le informazioni sono nella didascalia
          sotto e nelle liste della pagina. aria-hidden la toglie agli
          screen reader. */}
      <div
        ref={stage}
        className={`${styles.stage} ${dragging ? styles.dragging : ""}`}
        aria-hidden="true"
        // Le custom properties passano i numeri da React al CSS.
        style={{ "--k": radius } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div ref={ring} className={styles.ring}>
          {cards.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className={styles.card}
              // --depth qui è il valore di partenza (anello fermo sulla
              // prima scheda); poi lo aggiorna apply() a ogni fotogramma.
              style={
                {
                  "--turn": `${i * step}deg`,
                  "--depth": depthAt(i, 0, slots).toFixed(3),
                } as CSSProperties
              }
              onClick={() => goToSlot(i)}
            >
              <Image
                className={styles.image}
                src={item.image}
                alt=""
                sizes="42vw"
                placeholder="blur"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bar}>
        {/* aria-live: quando il testo cambia, lo screen reader lo annuncia.
            key={...active}: quando cambia la scheda, React butta via il
            vecchio elemento e ne crea uno nuovo; così l'animazione CSS
            d'ingresso riparte ogni volta. */}
        <div className={styles.caption} aria-live="polite">
          <p
            key={`counter-${active}`}
            className={`${styles.counter} ${styles.fade}`}
          >
            <span className={styles.number}>{pad(active + 1)}</span> /{" "}
            {pad(count)} &middot; {current.kind} &middot; {current.meta}
          </p>
          {/* Il titolo sale da sotto, "tagliato" dalla maschera (.title). */}
          <p className={styles.title}>
            <span key={active} className={styles.rise}>
              {current.title}
            </span>
          </p>
          <p
            key={`detail-${active}`}
            className={`${styles.detail} ${styles.fade}`}
          >
            {current.detail}
          </p>
          <Button
            variant="inline"
            href={`#${current.id}`}
            ariaLabel={`Vai alla scheda: ${current.title}`}
          >
            Vai alla scheda
          </Button>
        </div>

        <div className={styles.controls}>
          <p className={styles.hint} aria-hidden="true">
            Trascina &middot; Rotella &middot; Frecce &larr; &rarr;
          </p>

          {/* Trattini di avanzamento: uno per scheda, cliccabili. */}
          <div className={styles.dashes} role="group" aria-label="Vai a una scheda">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.dash} ${i === active ? styles.dashActive : ""}`}
                aria-label={`Scheda ${i + 1}: ${item.title}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goToItem(i)}
              />
            ))}
          </div>

          <div className={styles.arrows}>
            <Button
              variant="icon"
              ariaLabel="Scheda precedente"
              onClick={() => move(-1)}
            >
              &larr;
            </Button>
            <Button
              variant="icon"
              ariaLabel="Scheda successiva"
              onClick={() => move(1)}
            >
              &rarr;
            </Button>
          </div>
        </div>
      </div>

      {/* Indicatore di scorrimento: la rotonda riempie lo schermo, quindi
          senza un segnale non si capisce che sotto c'è altro. È un vero
          link (porta alla sezione successiva), non solo una decorazione. */}
      {scrollTo && (
        <a
          className={`${styles.scrollCue} ${cueHidden ? styles.cueHidden : ""}`}
          href={`#${scrollTo}`}
          aria-label="Scorri all'elenco completo"
        >
          <span className={styles.cueText} aria-hidden="true">
            Scorri
          </span>
          <span className={styles.cueLine} aria-hidden="true" />
        </a>
      )}
    </section>
  );
}
