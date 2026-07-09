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
          // ═══════════════════════════════════════════════════════════════════════
          //  IMPORTANTE — Secciones "Farmacias", "Negocios" y "Mascotas":
          //  datos locales de respaldo
          // ═══════════════════════════════════════════════════════════════════════
          //  Temporalmente NO se usa json.farmacias / json.negocios / json.mascotas
          //  (hoja Google Sheets) porque:
          //
          //  1. Las secciones están en construcción y aún no están vinculadas
          //     al CMS de Google Sheets con todos los campos necesarios.
          //  2. Se agregaron NUEVOS CAMPOS a los tipos (transport, schedule,
          //     phones, facebook, actionText, etc.) que la hoja actual no tiene.
          //  3. Cuando se termine de construir la integración con Google Apps
          //     Script y la hoja se actualice con estos campos, se podrá revertir
          //     a: json.farmacias ?? FALLBACK.farmacias (igual para negocios y
          //     mascotas).
          //
          //  Datos actuales en data.ts incluyen transport (Micros, Taxitrufis,
          //  Trufis, Radio Taxis) para que la sección "Cómo llegar" sea visible
          //  y funcional durante el desarrollo.
          // ═══════════════════════════════════════════════════════════════════════
          farmacias: FALLBACK.farmacias,
          negocios:  FALLBACK.negocios,
          mascotas:  FALLBACK.mascotas,
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
