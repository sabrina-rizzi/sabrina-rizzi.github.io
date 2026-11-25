import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "../styles/globals.scss";

// Carichiamo i font dal catalogo Google: Next li ottimizza e li serve
// dal nostro dominio. "variable" crea una CSS custom property che
// riusiamo nei nostri stili (--font-fraunces, --font-inter).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Monospace: solo per contatori, periodi ed etichette ("02 / 09").
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sabrina Rizzi — Junior AI Developer & Data Analyst",
  description:
    "Portfolio di Sabrina Rizzi: Junior AI Developer e Data Analyst, ponte tra business e tecnologia.",
  // Referrer Policy: quando si clicca un link verso un ALTRO sito, gli
  // comunichiamo solo il dominio (sabrina-rizzi.github.io), non la pagina
  // precisa; e niente del tutto se si passasse da https a http. Next la
  // scrive come <meta name="referrer"> (GitHub Pages non permette di
  // inviarla come intestazione). Il dominio basta a Formspree per
  // riconoscere da dove arriva il modulo.
  referrer: "strict-origin-when-cross-origin",
};

// Applica il tema salvato PRIMA che la pagina si disegni, così non si vede
// un lampo del tema sbagliato. Gira come testo puro, prima di React.
// Senza una scelta salvata non fa nulla: vale lo scuro, il predefinito.
// Segna anche che JavaScript è attivo (data-js): serve al CSS dell'hero
// per nascondere il testo solo quando poi c'è chi lo anima.
const themeInitScript = `
(function () {
  document.documentElement.dataset.js = "";
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") {
      document.documentElement.dataset.theme = t;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      {/* id="top": bersaglio del "torna su" nel footer. Sta sul body (non
          sull'header) perché l'header è sticky: è sempre visibile, quindi
          il browser non avrebbe motivo di scorrere. */}
      <body id="top">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Header e Footer stanno nel layout: compaiono su TUTTE le pagine */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
