import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { External } from "@/components/LegalPage/LegalPage";
import { legal } from "@/data/legal";

// Pagina /privacy-policy (la cartella dà il nome all'indirizzo).
// I testi descrivono ciò che il sito fa DAVVERO: se si aggiunge un
// servizio (statistiche, mappe, video incorporati...), va aggiornata.

export const metadata: Metadata = {
  title: "Privacy policy — Sabrina Rizzi",
  description: "Come vengono trattati i dati personali su questo sito.",
};

const { hosting, formspree } = legal;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy policy" updated={legal.updated}>
      <p>
        Questa pagina spiega quali dati personali vengono raccolti quando
        visiti il sito, perché e per quanto tempo, ai sensi del Regolamento
        UE 2016/679 (GDPR).
      </p>

      <h2>
        <span>01</span> Titolare del trattamento
      </h2>
      <p>
        Il titolare del trattamento è Sabrina Rizzi, contattabile tramite il{" "}
        <Link href="/contatti">modulo di contatto</Link> del sito.
      </p>

      <h2>
        <span>02</span> Dati raccolti
      </h2>
      <ul>
        <li>
          <strong>Dati che invii tu</strong>, tramite il modulo di contatto:
          nome, indirizzo email, oggetto e testo del messaggio.
        </li>
        <li>
          <strong>Dati tecnici di navigazione</strong>: come per qualsiasi
          sito, il servizio che lo ospita riceve l&apos;indirizzo IP e le
          informazioni inviate dal browser (tipo di browser, pagina richiesta,
          data e ora).
        </li>
      </ul>
      <p>
        Il sito non usa strumenti di statistica o di profilazione e non
        mostra pubblicità. I font e le immagini sono serviti dal sito stesso,
        senza richieste a servizi esterni.
      </p>

      <h2>
        <span>03</span> Finalità e base giuridica
      </h2>
      <ul>
        <li>
          <strong>Rispondere ai messaggi</strong> inviati con il modulo di
          contatto. Base giuridica: la tua richiesta di essere ricontattato
          (art. 6, par. 1, lett. b GDPR).
        </li>
        <li>
          <strong>Far funzionare il sito e proteggerlo</strong> da abusi
          (dati tecnici). Base giuridica: il legittimo interesse del titolare
          (art. 6, par. 1, lett. f GDPR).
        </li>
      </ul>

      <h2>
        <span>04</span> Chi riceve i dati
      </h2>
      <p>I dati non vengono venduti né ceduti a terzi, salvo i fornitori dei servizi necessari al sito:</p>
      <ul>
        <li>
          <strong>{formspree.name}</strong> — {formspree.company}: riceve e
          inoltra i messaggi del modulo di contatto.{" "}
          <External href={formspree.privacyUrl}>Informativa di {formspree.name}</External>.
        </li>
        <li>
          <strong>{hosting.name}</strong> — {hosting.company}: ospita il sito e
          ne registra i dati tecnici di accesso, anche per motivi di
          sicurezza.{" "}
          <External href={hosting.privacyUrl}>Informativa di GitHub</External>.
        </li>
      </ul>
      <p>
        Entrambi i fornitori hanno sede negli Stati Uniti: il trasferimento
        dei dati fuori dall&apos;Unione Europea avviene con le garanzie
        descritte nelle rispettive informative.
      </p>

      <h2>
        <span>05</span> Conservazione
      </h2>
      <p>
        I messaggi ricevuti tramite il modulo sono conservati per il tempo
        necessario a rispondere e comunque non oltre 24 mesi. I dati tecnici
        sono conservati dal servizio di hosting secondo la sua informativa.
      </p>

      <h2>
        <span>06</span> I tuoi diritti
      </h2>
      <p>In qualsiasi momento puoi chiedere di:</p>
      <ul>
        <li>accedere ai tuoi dati e riceverne una copia;</li>
        <li>correggerli o farli cancellare;</li>
        <li>limitarne il trattamento o opporti;</li>
        <li>riceverli in un formato leggibile (portabilità).</li>
      </ul>
      <p>
        Per farlo, scrivi tramite il{" "}
        <Link href="/contatti">modulo di contatto</Link>. Hai anche il diritto
        di presentare reclamo al{" "}
        <External href="https://www.garanteprivacy.it">
          Garante per la protezione dei dati personali
        </External>
        .
      </p>

      <h2>
        <span>07</span> Cookie
      </h2>
      <p>
        Il sito non usa cookie. I dettagli, compresa la memoria del browser
        usata per ricordare il tema chiaro o scuro, sono nella{" "}
        <Link href="/cookie-policy">cookie policy</Link>.
      </p>
    </LegalPage>
  );
}
