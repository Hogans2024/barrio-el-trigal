import { useState, useEffect } from 'react';
import { Pharmacy, NeighborhoodEvent, LocalBusiness, LostPet, Project } from '../types';
import {
  PHARMACIES_DATA, EVENTS_DATA, BUSINESSES_DATA, LOST_PETS_DATA, PROJECTS_DATA, NEWS_DATA
} from '../data';

interface SheetData {
  proyectos: Project[];
  eventos: NeighborhoodEvent[];
  farmacias: Pharmacy[];
  negocios: LocalBusiness[];
  mascotas: LostPet[];
  noticias: NeighborhoodEvent[];
  loading: boolean;
  error: string | null;
}

const FALLBACK = {
  proyectos: PROJECTS_DATA,
  eventos: EVENTS_DATA,
  farmacias: PHARMACIES_DATA,
  negocios: BUSINESSES_DATA,
  mascotas: LOST_PETS_DATA,
  noticias: NEWS_DATA,
};

export function useSheetData(): SheetData {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}data.json?v=${Date.now()}`;
    fetch(url)
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(json => {
        setData({
          proyectos: json.proyectos ?? FALLBACK.proyectos,
          eventos:   json.eventos   ?? FALLBACK.eventos,
          farmacias: json.farmacias ?? FALLBACK.farmacias,
          // ═══════════════════════════════════════════════════════════════════════
          //  IMPORTANTE — Sección "Negocios": datos locales inventados
          // ═══════════════════════════════════════════════════════════════════════
          //  Temporalmente NO se usa json.negocios (hoja Google Sheets).
          //  Se usa BUSINESSES_DATA (src/data.ts) con datos inventados porque:
          //
          //  1. La sección Negocios está en construcción y aún no está vinculada
          //     al CMS de Google Sheets.
          //  2. Se agregaron NUEVOS CAMPOS al tipo LocalBusiness que la hoja
          //     actual no tiene: phone, address, openHours, phones, facebook, etc.
          //  3. Cuando se termine de construir la sección, la hoja Google Sheets
          //     deberá actualizarse para incluir estos campos y entonces se
          //     podrá revertir a: json.negocios ?? FALLBACK.negocios
          //
          //  Datos actuales inventados en data.ts: 4 negocios (La Parrilla del
          //  Trigal, Boutique Estilo Real, Mercado El Campo, Vivero Oasis Verde)
          //  con address, phone, openHours, description personalizadas.
          // ═══════════════════════════════════════════════════════════════════════
          negocios:  FALLBACK.negocios,
          mascotas:  json.mascotas  ?? FALLBACK.mascotas,
          noticias:  json.noticias  ?? FALLBACK.noticias,
        });
        setError(null);
      })
      .catch(err => {
        console.warn('[useSheetData] Usando datos de respaldo.', err);
        setError(err.message);
        setData(FALLBACK);
      })
      .finally(() => setLoading(false));
  }, []);

  return { ...data, loading, error };
}
