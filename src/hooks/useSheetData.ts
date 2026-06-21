import { useState, useEffect } from 'react';
import { Pharmacy, NeighborhoodEvent, LocalBusiness, LostPet, Project } from '../types';
import {
  PHARMACIES_DATA, EVENTS_DATA, BUSINESSES_DATA, LOST_PETS_DATA, PROJECTS_DATA
} from '../data';

interface SheetData {
  proyectos: Project[];
  eventos: NeighborhoodEvent[];
  farmacias: Pharmacy[];
  negocios: LocalBusiness[];
  mascotas: LostPet[];
  loading: boolean;
  error: string | null;
}

const FALLBACK = {
  proyectos: PROJECTS_DATA,
  eventos: EVENTS_DATA,
  farmacias: PHARMACIES_DATA,
  negocios: BUSINESSES_DATA,
  mascotas: LOST_PETS_DATA,
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
          negocios:  json.negocios  ?? FALLBACK.negocios,
          mascotas:  json.mascotas  ?? FALLBACK.mascotas,
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
