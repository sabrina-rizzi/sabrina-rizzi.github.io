import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { External, TableScroll } from "@/components/LegalPage/LegalPage";
import { legal } from "@/data/legal";

// Pagina /cookie-policy. Descrive ciò che il sito salva nel browser:
// oggi nessun cookie, solo la preferenza del tema (localStorage, vedi
// ThemeToggle). Se si aggiunge qualcosa che salva dati nel browser
// (es. la scelta della lingua), va aggiunta una riga alla tabella.

export const metadata: Metadata = {
  title: "Cookie policy — Sabrina Rizzi",
  description: "Cookie e dati salvati nel browser da questo sito.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie policy" updated={legal.updated}>
      <h2>
        <span>01</span> Cosa sono i cookie
      </h2>
      <p>
        I cookie sono piccoli file di testo che un sito salva nel browser di
        chi lo visita. Possono servire a far funzionare il sito o, in altri
        casi, a raccogliere informazioni sulla navigazione.
      </p>

      <h2>
        <span>02</span> Questo sito non usa cookie
      </h2>
      <p>
        Il sito non imposta cookie: né tecnici, né di statistica, né di
        profilazione. Per questo non viene mostrato alcun banner di consenso.
      </p>

      <h2>
        <span>03</span> Preferenza del tema
      </h2>
      <p>
        Se scegli il tema chiaro o scuro con l&apos;apposito pulsante, la scelta
        viene ricordata nella memoria locale del browser (
        <code>localStorage</code>), così resta valida alle visite successive.
        Il dato resta sul tuo dispositivo e non viene inviato a nessuno.
      </p>
      <TableScroll>
        <table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Dove</th>
              <th scope="col">Finalità</th>
              <th scope="col">Durata</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>theme</code>
              </td>
              <td>Memoria locale del browser</td>
              <td>Ricordare il tema scelto (chiaro o scuro)</td>
              <td>Finché non la cancelli</td>
            </tr>
          </tbody>
        </table>
      </TableScroll>

      <h2>
        <span>04</span> Servizi esterni
      </h2>
      <ul>
        <li>
          <strong>Modulo di contatto</strong>: i messaggi sono inviati a{" "}
          {legal.formspree.name} senza lasciare la pagina. Se JavaScript è
          disattivato, l&apos;invio apre una pagina di {legal.formspree.name},
          che applica la{" "}
          <External href={legal.formspree.privacyUrl}>propria informativa</External>.
        </li>
        <li>
          <strong>Link ad altri siti</strong> (LinkedIn, GitHub, demo dei
          progetti): una volta aperti, valgono le regole di quei siti.
        </li>
      </ul>

      <h2>
        <span>05</span> Come cancellare i dati dal browser
      </h2>
      <p>
        Puoi cancellare la preferenza del tema, e in generale i dati salvati
        dai siti, dalle impostazioni del browser:
      </p>
      <ul>
        <li>
          <External href="https://support.google.com/chrome/answer/95647">
            Google Chrome
          </External>
        </li>
        <li>
          <External href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie">
            Mozilla Firefox
          </External>
        </li>
        <li>
          <External href="https://support.apple.com/it-it/guide/safari/sfri11471/mac">
            Safari
          </External>
        </li>
        <li>
          <External href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">
            Microsoft Edge
          </External>
        </li>
      </ul>

      <h2>
        <span>06</span> Aggiornamenti
      </h2>
      <p>
        Se il sito cambierà il modo in cui usa il browser, questa pagina verrà
        aggiornata e la data in alto lo indicherà. Per il trattamento dei dati
        personali, vedi la <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
