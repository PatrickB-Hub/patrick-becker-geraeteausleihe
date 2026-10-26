import express from "express";
import {
  getAlleGeraete,
  getGeraet,
  setAusgeliehenAn,
  setZustand,
} from "./repository.ts";

const app = express();
app.use(express.json());

// Suche über URL-Parameter, alle optional: /geraete?typ=Laptop&hersteller=Dell&verfuegbar=true
app.get("/geraete", (req, res) => {
  const { typ, hersteller, verfuegbar } = req.query;
  const equals = (a: string, b: unknown) =>
    typeof b !== "string" || a.toLowerCase() === b.toLowerCase();

  const geraete = getAlleGeraete().filter(
    (g) =>
      equals(g.typ, typ) &&
      equals(g.hersteller, hersteller) &&
      (verfuegbar !== "true" ||
        (g.zustand === "in Ordnung" && !g.ausgeliehenAn)),
  );
  res.json(geraete);
});

app.get("/geraete/:seriennummer", (req, res) => {
  const geraet = getGeraet(req.params.seriennummer);
  if (!geraet) {
    res.status(404).json({ fehler: "Gerät nicht gefunden" });
    return;
  }
  res.json(geraet);
});

// body: { mitarbeiter: string }
app.post("/geraete/:seriennummer/ausleihen", (req, res) => {
  const mitarbeiter = req.body?.mitarbeiter;
  if (typeof mitarbeiter !== "string" || !mitarbeiter.trim()) {
    res.status(400).json({ fehler: "mitarbeiter fehlt" });
    return;
  }
  const geraet = getGeraet(req.params.seriennummer);
  if (!geraet) {
    res.status(404).json({ fehler: "Gerät nicht gefunden" });
    return;
  }
  if (geraet.zustand === "defekt") {
    res
      .status(409)
      .json({ fehler: "Gerät ist defekt und kann nicht ausgeliehen werden" });
    return;
  }
  if (geraet.ausgeliehenAn) {
    res.status(409).json({ fehler: "Gerät ist bereits ausgeliehen" });
    return;
  }
  res.json(setAusgeliehenAn(geraet.seriennummer, mitarbeiter.trim()));
});

// body: { zustand?: "defekt" | "in Ordnung" }; Gerät geht zurück in seinen Schrank (Entscheidung: Platz bleibt reserviert)
// "in Ordnung" ändert nichts: eine Rückgabe darf ein als defekt gemeldetes Gerät nicht wieder freischalten.
app.post("/geraete/:seriennummer/rueckgabe", (req, res) => {
  const zustand = req.body?.zustand;
  if (
    zustand !== undefined &&
    zustand !== "defekt" &&
    zustand !== "in Ordnung"
  ) {
    res
      .status(400)
      .json({ fehler: 'zustand muss "defekt" oder "in Ordnung" sein' });
    return;
  }
  const geraet = getGeraet(req.params.seriennummer);
  if (!geraet) {
    res.status(404).json({ fehler: "Gerät nicht gefunden" });
    return;
  }
  if (!geraet.ausgeliehenAn) {
    res.status(409).json({ fehler: "Gerät ist nicht ausgeliehen" });
    return;
  }
  if (zustand === "defekt") setZustand(geraet.seriennummer, "defekt");
  res.json(setAusgeliehenAn(geraet.seriennummer, undefined));
});

// jederzeit möglich, auch während das Gerät verliehen ist
app.post("/geraete/:seriennummer/defekt", (req, res) => {
  const geraet = setZustand(req.params.seriennummer, "defekt");
  if (!geraet) {
    res.status(404).json({ fehler: "Gerät nicht gefunden" });
    return;
  }
  res.json(geraet);
});

app.listen(3000, () => console.log("Läuft auf http://localhost:3000"));
