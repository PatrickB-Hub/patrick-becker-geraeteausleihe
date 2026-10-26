# IT-Geräteausleihe

## Ein Programm zur Verwaltung der IT-Geräteausleihe einer Firma

Gegeben: mehrere Schränke mit einer begrenzten Anzahl an Geräten, Geräte haben Typ, Hersteller, Seriennummer und Zustand. Der Zustand (in Ordnung oder defekt) entscheidet darüber, ob Geräte weiter verliehen werden können, oder nicht.
Geräte können gesucht, ausgeliehen oder wieder zurückgegeben werden.

## Verwendung

Voraussetzung: Node.js ab Version 22.18

```bash
npm install      # Abhängigkeiten installieren
npm start        # Server starten auf http://localhost:3000 (startet bei Änderungen neu)
npm run check    # Typen prüfen
```

Endpunkte:

| Methode | Pfad                                                  | Body                                 |
| ------- | ----------------------------------------------------- | ------------------------------------ |
| GET     | `/geraete?typ=Laptop&hersteller=Dell&verfuegbar=true` | –                                    |
| GET     | `/geraete/:seriennummer`                              | –                                    |
| POST    | `/geraete/:seriennummer/ausleihen`                    | `{ "mitarbeiter": "Max Muster" }`    |
| POST    | `/geraete/:seriennummer/rueckgabe`                    | `{ "zustand": "defekt" }` (optional) |
| POST    | `/geraete/:seriennummer/defekt`                       | –                                    |

Relevante Fragestellungen aus der Aufgabe: Wer weiß was und was soll passieren wenn etwas schief geht?

- Überlegungen dazu: Der Mitarbeiter weiß über den Zustand seines ausgeliehenen Gerätes bescheid (in Ordnung/defekt). Was passiert mit dem Platz im Schrank, wenn ein Gerät verliehen wurde? Neu belegen oder frei lassen, also quasi für das spezifische Gerät reservieren. Dann braucht es deutlich mehr Schränke und defekte Geräte blockieren den Platz im Schrank evtl. sehr lange Zeit. Sinnvoller wäre es, einen freien Platz direkt neu zu belegen. Was passiert, wenn kein Platz mehr da ist, ein Gerät aber zurück gegeben werden soll. -> Neuer Schrank. Aber Schränke sind endlich. Ich entscheide mich trotzdem vorerst für die Variante, bei der der Platz reserviert bleibt. Wenn ich genug Zeit habe, passe ich das anschließend noch an.

* Ich entscheide mich für eine Node, Express Lösung mit Typescript und vorerst gegen eine DB für die Geräteverwaltung, weil das evtl. den Rahmen sprengt. Stattdessen lege ich die Daten als Objekte an. Die Änderungen sind dann nicht persistiert, für eine produktive Anwendung wäre das also keine Lösung. Wenn am Ende noch genug Zeit bleibt, binde ich noch eine Postrgres Datenbank an (dann evtl. mit KI, falls genug Zeit bleibt den KI-Code zu prüfen).

* Zuerst bilde ich die Daten ab, indem ich sinnvolle Typen erstelle. Dann lege ich die notwendigen Routen an (erstmal ohne Logik) und entscheide, ob das ausreicht. Dann mache ich mit der Logik weiter und teste die Endpunkte mit Postman (weil ich das schon installiert habe, nicht weil es mir besonders gefällt :D)

TODO: Was habe ich umgesetzt?

TODO: Ausblick, wie würde ich weiter machen, wenn die Anwendung produktiv eingesetzt werden soll? Hier bspw. den Hinweis auf Datenpersistenz aufgreifen.
