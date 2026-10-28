"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Panel = "reservation" | "menu" | "visit" | "contact" | "imprint" | "instagram";
const dishes = [
  ["Oliven, Zitrone, Kräuter", "5"],
  ["Burrata, Tomate, Basilikum", "12"],
  ["Gerösteter Blumenkohl, Tahini", "9"],
];
const menuDishes = [
  { name: "Brot & Butter", ingredients: "Sauerteigbrot, aufgeschlagene Salzbutter", price: "6" },
  { name: "Eine Schale Oliven", ingredients: "Marinierte Oliven, Zitrone, frische Kräuter", price: "5" },
  { name: "Die Burrata", ingredients: "Burrata, geschmorte Tomaten, Basilikum, Olivenöl", price: "12" },
  { name: "Gold aus dem Ofen", ingredients: "Gerösteter Blumenkohl, Tahini, Haselnuss, Petersilie", price: "9" },
  { name: "Knusperkartoffeln", ingredients: "Kleine Ofenkartoffeln, Aioli, Schnittlauch", price: "8" },
];
const menuDrinks = [
  { name: "Weiß oder Rot", ingredients: "Unser offener Hauswein · 0,15 l", price: "ab 7" },
  { name: "Ein bisschen Orange", ingredients: "Maischevergorener Weißwein · 0,15 l", price: "8" },
  { name: "Der Negroni", ingredients: "Gin, roter Wermut, Bitter, Orangenzeste", price: "12" },
  { name: "Auch ohne", ingredients: "Alkoholfreier Spritz, Orange, Soda", price: "8" },
];

function MenuItems({ items }: { items: typeof menuDishes }) {
  return <ul className="menu-items">{items.map(item => <li key={item.name}>
    <div className="menu-item-copy"><h4>{item.name}</h4><p>{item.ingredients}</p></div>
    <span className="menu-item-price" aria-label={`${item.price} Euro`}>{item.price}</span>
  </li>)}</ul>;
}

export default function Home() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [panel, setPanel] = useState<Panel>("reservation");
  const [confirmed, setConfirmed] = useState(false);
  const [summary, setSummary] = useState({ name: "", people: "", date: "", time: "" });
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const current = dialog.current;
    const restore = () => { document.body.style.overflow = ""; trigger.current?.focus(); };
    current?.addEventListener("close", restore);
    return () => { current?.removeEventListener("close", restore); document.body.style.overflow = ""; };
  }, []);

  function openPanel(next: Panel) {
    setMinDate(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
    trigger.current = document.activeElement as HTMLElement;
    setPanel(next);
    setConfirmed(false);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const date = String(data.get("date"));
    const weekday = new Date(`${date}T12:00:00`).getDay();
    const dateField = form.elements.namedItem("date") as HTMLInputElement;
    if (weekday === 0 || weekday === 1) {
      dateField.setCustomValidity("Wir sind Dienstag bis Samstag für dich da. Bitte wähle einen dieser Tage.");
      dateField.reportValidity();
      return;
    }
    setSummary({ name: String(data.get("name")).trim(), people: String(data.get("people")), date, time: String(data.get("time")) });
    setConfirmed(true);
  }

  const title = { reservation: confirmed ? "Ein Platz für dich." : "Ein Tisch für euch.", menu: "Die Karte", visit: "Komm vorbei.", contact: "Sag hallo.", imprint: "Über dieses Projekt", instagram: "Ein kleiner Einblick." }[panel];

  return (
    <>
      <a href="#inhalt" className="skip-link">Zum Inhalt</a>
      <header className="site-header page-width">
        <a className="eyebrow" href="#" aria-label="noch ein glas — Startseite">Weinbar & kleine Teller</a>
        <nav aria-label="Hauptnavigation">
          <a href="#karte">Karte</a>
          <button onClick={() => openPanel("visit")}>Besuch</button>
          <button className="button header-reserve" onClick={() => openPanel("reservation")}>Reservieren</button>
        </nav>
      </header>

      <main id="inhalt">
        <div className="masthead page-width"><h1>noch ein glas</h1></div>
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-copy">
            <h2 id="intro-title" className="handwritten">Heute nur<br />noch kurz.</h2>
            <p>Wein, kleine Teller und<br />ein Platz für dich.</p>
            <button className="button reservation-button" onClick={() => openPanel("reservation")}>Tisch reservieren</button>
            <Image className="bottle-sketch" src="/images/bottle.png" alt="" width={180} height={210} />
          </div>
          <div className="hero-photo photo">
            <Image src="/images/hero.webp" alt="Wein wird eingeschenkt, kleine Teller stehen auf einem Tisch im Kerzenlicht." fill sizes="(max-width: 700px) 100vw, 62vw" preload />
          </div>
        </section>

        <div className="cinematic photo">
          <Image src="/images/evening.webp" alt="Ein Blick durch das Fenster: warme Lichter, volle Gläser und ein gemeinsamer Abend in der Weinbar." fill sizes="100vw" />
        </div>

        <section className="menu-section page-width" id="karte" aria-labelledby="menu-title">
          <div className="menu-copy">
            <h2 id="menu-title">Für den Tisch</h2>
            <ul className="dish-list">{dishes.map(([name, price]) => <li key={name}><span>{name}</span><span aria-label={`${price} Euro`}>{price}</span></li>)}</ul>
            <button className="text-link" onClick={() => openPanel("menu")}>Die ganze Karte</button>
          </div>
          <figure className="cocktail-figure">
            <div className="cocktail-photo photo"><Image src="/images/negroni.webp" alt="Ein Negroni mit Orangenzeste in der Hand, zwischen Oliven und kleinen Tellern." fill sizes="(max-width: 700px) 90vw, 43vw" /></div>
            <figcaption className="handwritten cocktail-note">auch<br />für<br />danach.</figcaption>
          </figure>
        </section>

        <section className="closing page-width" aria-label="Ein Abend bei uns">
          <figure className="closing-wide">
            <div className="plate-photo photo"><Image src="/images/table-overhead.webp" alt="Ein Tisch von oben mit Oliven, Brot, Burrata, Ofengemüse, Weißwein und Negroni." fill sizes="(max-width: 700px) 90vw, 55vw" /></div>
            <figcaption className="handwritten">bis gleich.</figcaption>
          </figure>
          <figure className="closing-narrow">
            <div className="wine-photo photo"><Image src="/images/white-wine.webp" alt="Ein Glas Weißwein neben einer Leinenserviette auf einem Tisch im Kerzenlicht." fill sizes="(max-width: 700px) 52vw, 30vw" /></div>
            <Image className="olive-sketch" src="/images/olive.png" alt="" width={150} height={95} />
          </figure>
        </section>
      </main>

      <footer className="site-footer page-width">
        <button onClick={() => openPanel("visit")}>Di – Sa ab 17 Uhr</button>
        <button onClick={() => openPanel("contact")}>Kontakt</button>
        <div><button onClick={() => openPanel("instagram")}>Instagram</button><span aria-hidden="true"> · </span><button onClick={() => openPanel("imprint")}>Impressum</button></div>
      </footer>

      <dialog ref={dialog} className={`site-dialog${panel === "menu" ? " menu-dialog" : ""}`} aria-labelledby="dialog-title" onClick={(event) => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current?.close(); } }}>
        <div className="dialog-top"><span className="eyebrow">noch ein glas</span><button className="text-link" autoFocus onClick={() => dialog.current?.close()} aria-label="Dialog schließen">Schließen</button></div>
        <h2 id="dialog-title" tabIndex={-1}>{title}</h2>
        {panel === "reservation" && (!confirmed ? <>
          <p className="dialog-intro">Für ein Glas. Oder einen ganzen Abend.</p>
          <form onSubmit={submitReservation}>
            <div className="form-pair"><label>Datum<input name="date" type="date" min={minDate} required onInput={(e) => e.currentTarget.setCustomValidity("")} /></label><label>Personen<select name="people" defaultValue="2"><option value="1">1 Person</option><option value="2">2 Personen</option><option value="3">3 Personen</option><option value="4">4 Personen</option><option value="5">5 Personen</option><option value="6">6 Personen</option></select></label></div>
            <label>Uhrzeit<select name="time" defaultValue="19:00">{["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map(time => <option key={time}>{time}</option>)}</select></label>
            <label>Dein Name<input name="name" autoComplete="given-name" maxLength={80} required pattern=".*\S.*" /></label>
            <p className="demo-note">Portfolio-Demo: Es wird keine echte Reservierung angelegt. Deine Angaben bleiben in diesem Browserfenster.</p>
            <button type="submit" className="button">Reservierung ausprobieren</button>
          </form>
        </> : <div className="confirmation" role="status"><p>So könnte dein Abend aussehen, {summary.name}:</p><p className="booking-summary">{new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${summary.date}T12:00:00`))}<br />{summary.time} Uhr · {summary.people} {summary.people === "1" ? "Person" : "Personen"}</p><p className="demo-note">Das war eine Demo. Es wurde keine Buchung versendet oder gespeichert.</p><button className="button" onClick={() => dialog.current?.close()}>Zurück zum Abend</button></div>)}
        {panel === "menu" && <div className="full-menu">
          <div className="menu-introduction">
            <p className="handwritten">am liebsten in der Mitte.</p>
            <Image src="/images/olive.png" alt="" width={105} height={75} className="menu-olive" />
          </div>
          <div className="menu-columns">
            <section aria-labelledby="food-heading" className="food-column">
              <h3 id="food-heading">Für den Tisch</h3>
              <MenuItems items={menuDishes} />
            </section>
            <section aria-labelledby="drinks-heading" className="drinks-column">
              <h3 id="drinks-heading">Fürs Glas</h3>
              <MenuItems items={menuDrinks} />
              <div className="menu-margin-note" aria-hidden="true">
                <Image src="/images/bottle.png" alt="" width={65} height={100} />
                <span className="handwritten">noch eins?</span>
              </div>
            </section>
          </div>
          <div className="menu-footnote"><p>Frag uns gern nach Zutaten & Allergenen.</p><p>Beispielkarte · alle Preise in Euro.</p></div>
        </div>}
        {panel === "visit" && <><p>Dienstag bis Samstag<br />17:00 – 00:00 Uhr</p><p>Sonntag & Montag machen wir Pause.</p><button className="button" onClick={() => { setPanel("reservation"); setConfirmed(false); }}>Tisch reservieren</button><p className="demo-note">„noch ein glas“ ist ein fiktives Weinbar-Konzept. Eine echte Adresse gibt es noch nicht.</p></>}
        {panel === "contact" && <><p>Schön, dass du vorbeischaust.</p><p>„noch ein glas“ ist ein Portfolio-Projekt. Deshalb gibt es hier noch keine echte Kontaktadresse.</p><button className="text-link" onClick={() => dialog.current?.close()}>Zurück zur Seite</button></>}
        {panel === "imprint" && <><p>„noch ein glas“ ist eine fiktive Weinbar und eine gestalterische Portfolio-Demo.</p><p>Es gibt keinen Gastronomiebetrieb und keine echte Buchungsfunktion. Fotos und Illustrationen wurden für dieses Konzept mit KI erstellt.</p><p>Vor einer Veröffentlichung müssen die Angaben zur verantwortlichen Person ergänzt werden.</p></>}
        {panel === "instagram" && <><p>Unsere Abendmomente findest du schon hier auf der Seite.</p><p className="demo-note">Für diese fiktive Weinbar gibt es kein Instagram-Profil.</p><button className="button" onClick={() => dialog.current?.close()}>Weiter umschauen</button></>}
      </dialog>
    </>
  );
}
