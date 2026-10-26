export type Zustand = "in Ordnung" | "defekt";

export interface Schrank {
  id: string; // UNIQ
  kapazitaet: number; // Wie viele Geräte passen in den Schrank
}

export interface Geraet {
  seriennummer: string; // UNIQ
  typ: string; // z.B. "Laptop", "Headset", "Monitor"
  hersteller: string; // z.B. "Lenovo", "Dell"...
  zustand: Zustand;
  schrankId: string; // UNIQ
  ausgeliehenAn?: string; // ID des Mitarbeiters oder undefined = verfügbar
}
