import type { Geraet, Schrank, Zustand } from "./types.ts";
import { geraete, schraenke } from "./Daten.ts";

// ---------- Getter: Geräte ----------

export function getAlleGeraete(): Geraet[] {
  return geraete.map((g) => ({ ...g }));
}

export function getGeraet(seriennummer: string): Geraet | undefined {
  const geraet = geraete.find((g) => g.seriennummer === seriennummer);
  return geraet ? { ...geraet } : undefined;
}

/** Alle Geräte, deren schrankId auf den Schrank zeigt (egal ob verliehen oder nicht) */
export function getGeraeteInSchrank(schrankId: string): Geraet[] {
  return geraete
    .filter((g) => g.schrankId === schrankId)
    .map((g) => ({ ...g }));
}

/** Alle Geräte, die aktuell an diesen Mitarbeiter verliehen sind */
export function getGeraeteVonMitarbeiter(mitarbeiter: string): Geraet[] {
  return geraete
    .filter((g) => g.ausgeliehenAn === mitarbeiter)
    .map((g) => ({ ...g }));
}

// ---------- Getter: Schränke ----------

export function getAlleSchraenke(): Schrank[] {
  return schraenke.map((s) => ({ ...s }));
}

export function getSchrank(id: string): Schrank | undefined {
  const schrank = schraenke.find((s) => s.id === id);
  return schrank ? { ...schrank } : undefined;
}

// ---------- Setter: Geräte ----------
// Rückgabe: das aktualisierte Gerät, oder undefined, wenn die Seriennummer unbekannt ist.

function findeGeraet(seriennummer: string): Geraet | undefined {
  return geraete.find((g) => g.seriennummer === seriennummer);
}

/** mitarbeiter = undefined setzt das Gerät auf "nicht verliehen" */
export function setAusgeliehenAn(
  seriennummer: string,
  mitarbeiter: string | undefined,
): Geraet | undefined {
  const geraet = findeGeraet(seriennummer);
  if (!geraet) return undefined;

  if (mitarbeiter === undefined) {
    delete geraet.ausgeliehenAn;
  } else {
    geraet.ausgeliehenAn = mitarbeiter;
  }
  return { ...geraet };
}

export function setZustand(
  seriennummer: string,
  zustand: Zustand,
): Geraet | undefined {
  const geraet = findeGeraet(seriennummer);
  if (!geraet) return undefined;

  geraet.zustand = zustand;
  return { ...geraet };
}

export function setSchrankId(
  seriennummer: string,
  schrankId: string,
): Geraet | undefined {
  const geraet = findeGeraet(seriennummer);
  if (!geraet) return undefined;

  geraet.schrankId = schrankId;
  return { ...geraet };
}
