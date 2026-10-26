import express from "express";

const app = express();
app.use(express.json());

const todo: express.RequestHandler = (_req, res) => {
  res.status(501).json({ fehler: "Noch nicht implementiert" });
};

// später lässt sich z.B. mit url-parametern suchen: /geraete?typ=Laptop&hersteller=Dell&verfuegbar=true
app.get("/geraete", todo);
app.get("/geraete/:seriennummer", todo);

// body: { mitarbeiter: string }
app.post("/geraete/:seriennummer/ausleihen", todo);

// body: { zustand?: Zustand }; Gerät geht zurück in seinen Schrank (Entscheidung: Platz bleibt reserviert)
app.post("/geraete/:seriennummer/rueckgabe", todo);

// jederzeit möglich, auch während das Gerät verliehen ist
app.post("/geraete/:seriennummer/defekt", todo);

app.listen(3000, () => console.log("Läuft auf http://localhost:3000"));
