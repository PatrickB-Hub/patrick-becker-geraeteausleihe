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

* Zuerst bilde ich die Daten ab, indem ich sinnvolle Typen erstelle. Dann lege ich die notwendigen Routen an (erstmal ohne Logik) und entscheide, ob das ausreicht. Dann mache ich mit der Logik weiter und teste die Endpunkte mit Postman (weil ich das schon installiert habe, nicht weil es mir besonders gefällt :D), ginge aber auch mit curl.

* Das Grundgerüst steht, ich habe mir vom KI-Agenten Beispieldaten erstellen lassen und lasse mir jetzt auch getter und setter Methoden schreiben, die auf den Daten arbeiten. Ich bringe die Logik dann in die Routes und prüfe die Endpunkte mit Postman.

* Kleiner Einschub: Ich habe gerade das Wort "Klassen" in der Aufgabenbeschreibung gelesen. Da ich jetzt keinen OOP Ansatz gewählt habe und mir auch die Zeit fehlen würde, dass noch anzupassen, nur so viel: Die beiden Interfaces in types.ts würde ich als eine Art "Blueprint" für das Erstellen der Klassen verwenden.

# Was habe ich umgesetzt?

- REST-API mit Node.js, Express und TypeScript
- Datenmodell in Form von types (später als Vorlage für DB-Schema geeignet)
- Arbeiten auf nicht persistenten Daten
- Logik für die Routes 
- Routes können: 
    Geräte suchen, nach Typ, Hersteller und Verfügbarkeit
    ein Gerät ausgeben
    Gerät ausleihen
    Gerät zurückgeben (optional mit Hinweis auf Defekt)
    als defekt melden
    responses mit sinnvollen http status Codes
    Endpunkte manuell mit Postman getestet

# Ausblick, wie würde ich weiter machen, wenn die Anwendung produktiv eingesetzt werden soll?

Thema Sicherheit: Aktuell kann "jeder" Geräte auf fremde Namen ausleihen, fremde Geräte zurückgeben oder fremde Geräte als defekt melden. Wer ausleiht, muss vom Server kommen, nicht vom Client. 
Es muss auch noch gespeichert werden, wer ein Gerät wann zurück gibt, oder als defekt meldet.
Es gibt aktuell keine Möglichkeit ein defektes Gerät "wieder in Betrieb zu nehmen".
Es braucht also eine "Anmeldefunktion" bspw. ein Login-Token.

Datenbank für persistente Daten. Im Moment geht jede Änderung beim Neustart verloren. Dann muss die Logik in weiten Teilen angepasst werden, weil wir nicht mehr nur in der synchronen Node.js Umgebung arbeiten, sondern asynchrone Abfragen haben. Bspw. wollen. zwei Mitarbeiter gleichzeitig das selbe Gerät ausleihen. Die Datenbank muss dann die Aufgabe übernehmen, zu prüfen, ob das Gerät schon an jemanden ausgeliehen ist und in welchem Zustand es ist. "in Ordnung" und zurückgegeben -> kann ausgeliehen werden.

Die Routes würde ich mit Tests absichern und idealer Weise läuft das ganze dann in ener CI-Pipeline. Ich hätte die Tests jetzt auch vom KI-Agenten erstellen lassen können. Möchte aber genug Zeit haben, den Code zu prüfen und verzichte desshalb für diese Übungsaufgabe darauf. 

Logging verbessern: wie und mit welchen Werkzeugen müsste ich erst noch rausfinden.