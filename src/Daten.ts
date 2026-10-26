import type { Schrank, Geraet } from "./types.ts";

export const schraenke: Schrank[] = [
  { id: "S-01", kapazitaet: 2 },
  { id: "S-02", kapazitaet: 1 },
  { id: "S-03", kapazitaet: 3 },
];

export const geraete: Geraet[] = [
  {
    seriennummer: "LNV-0001",
    typ: "Laptop",
    hersteller: "Lenovo",
    zustand: "in Ordnung",
    schrankId: "S-01",
    // verfügbar
  },
  {
    seriennummer: "JBR-0002",
    typ: "Headset",
    hersteller: "Jabra",
    zustand: "in Ordnung",
    schrankId: "S-01",
    ausgeliehenAn: "M-1001", // verliehen
  },
  {
    seriennummer: "DLL-0003",
    typ: "Monitor",
    hersteller: "Dell",
    zustand: "defekt",
    schrankId: "S-02",
    // defekt im Schrank, also nicht verfügbar
  },
];
