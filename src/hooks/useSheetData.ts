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
    // ═══════════════════════════════════════════════════════════════════════════════════════════════
    //  🚫 BLOQUEO TEMPORAL — Conexión al CMS (Google Sheets + Apps Script) DESHABILITADA
    //  ═══════════════════════════════════════════════════════════════════════════════════════════════
    //
    //  ⚠️  ATENCIÓN — LEE ESTO ANTES DE MODIFICAR:
    //
    //  _____________________________________________________________________________________________
    //  |                                                                                           |
    //  |  🎯 PROPÓSITO DE ESTE BLOQUEO:                                                            |
    //  |  ──────────────────────────────                                                           |
    //  |  Deshabilitamos temporalmente la obtención de datos desde Google Sheets vía Apps Script   |
    //  |  (archivo `public/data.json` servido por GitHub Pages) porque las URLs de las imágenes    |
    //  |  almacenadas en Google Sheets están CAÍDAS (HTTP 404) y al sobrescribir los datos         |
    //  |  locales, las tarjetas de Proyectos, Eventos y Noticias se quedan sin imagen.             |
    //  |                                                                                           |
    //  |  Al forzar el uso de datos locales (FALLBACK), podemos controlar las URLs de las imágenes |
    //  |  directamente desde `src/data.ts` y mantenerlas actualizadas sin depender del CMS.        |
    //  |___________________________________________________________________________________________|
    //
    //  _____________________________________________________________________________________________
    //  |                                                                                           |
    //  |  🛠️  CÓMO RESTAURAR LA CONEXIÓN AL CMS (CUANDO ESTÉ LISTO):                              |
    //  |  ───────────────────────────────────────────────────────────                              |
    //  |  1. Elimina o comenta la línea que llama a `setFallbackAndFinish()` más abajo.            |
    //  |  2. Descomenta el BLOQUE A (el fetch + parse + setData).                                  |
    //  |  3. Verifica que el archivo `public/data.json` esté siendo servido correctamente         |
    //  |     y que contenga TODOS los campos requeridos por los types (TransportInfo, etc.).       |
    //  |  4. Asegúrate de que las URLs en Google Sheets sean válidas (HTTP 200).                   |
    //  |___________________________________________________________________________________________|
    //
    //  _____________________________________________________________________________________________
    //  |                                                                                           |
    //  |  📋 ESTRUCTURA DEL CÓDIGO:                                                                |
    //  |  ─────────────────────────                                                                |
    //  |  Hay DOS bloques mutuamente excluyentes. SOLO UNO debe estar activo a la vez:             |
    //  |                                                                                           |
    //  |  - BLOQUE A (ACTIVO): Forza datos locales (FALLBACK) en TODAS las secciones.              |
    //  |  - BLOQUE B (COMENTADO): Fetch al CMS + merge con FALLBACK.                               |
    //  |                                                                                           |
    //  |  Cuando quieras reconectar el CMS, activa B y desactiva A.                                 |
    //  |___________________________________________________________________________________________|
    //
    //  _____________________________________________________________________________________________
    //  |                                                                                           |
    //  |  🔗 FLUJO COMPLETO (cuando esté conectado):                                               |
    //  |  ─────────────────────────────────────────────                                            |
    //  |  Google Sheets (hojas con datos)                                                           |
    //  |      → Google Apps Script (code.gs en la nube)                                            |
    //  |          → Exporta a `data.json`                                                           |
    //  |              → Publica en GitHub Pages (pendiente de configurar)                           |
    //  |                  → El frontend hace fetch(`${BASE_URL}data.json?v=${Date.now()}`)          |
    //  |                      → useSheetData hook parsea y distribuye a cada vista                  |
    //  |                          → Cada vista renderiza `item.imageUrl`                            |
    //  |                                                                                           |
    //  |  Las secciones Alarma y Afiliación usan datos separados (`src/data.alarma.ts`)            |
    //  |  y NO dependen de este flujo CMS.                                                         |
    //  |___________________________________________________________________________________________|
    //
    // ═══════════════════════════════════════════════════════════════════════════════════════════════

    // ─── BLOQUE A: Datos locales (FALLBACK) — ACTIVO ───
    // Cuando quieras reconectar al CMS, desactiva este bloque y activa el BLOQUE B.
    setData(FALLBACK);
    setLoading(false);
    return; // ← Salimos del efecto, NO ejecutamos el fetch

    // ─── BLOQUE B: Fetch al CMS — COMENTADO (desactivado temporalmente) ───
    // Descomenta todo este bloque cuando el CMS esté listo (ver instrucciones arriba).
    /*
    const url = `${import.meta.env.BASE_URL}data.json?v=${Date.now()}`;
    fetch(url)
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(json => {
        setData({
          proyectos: json.proyectos ?? FALLBACK.proyectos,
          eventos:   json.eventos   ?? FALLBACK.eventos,
          // ═══════════════════════════════════════════════════════════════════════════════════
          //  WORKAROUND — Datos locales de respaldo para Farmacias, Negocios y Mascotas
          // ═══════════════════════════════════════════════════════════════════════════════════
          //
          //  PROBLEMA IDENTIFICADO:
          //  ──────────────────────
          //  El archivo `public/data.json` es servido por el CMS y contiene los datos
          //  actuales provenientes de Google Sheets. Sin embargo, dicho archivo NO incluye
          //  los campos `transport` (ni `schedule`, `phones`, `facebook`, `actionText`)
          //  en sus objetos `farmacias` y `mascotas`, porque la hoja de cálculo vinculada
          //  al endpoint de Apps Script aún no ha sido actualizada con estas columnas.
          //
          //  Como consecuencia directa, al usar `json.farmacias ?? FALLBACK.farmacias`,
          //  el operador `??` (Nullish coalescing) **no** activaba el fallback, ya que
          //  `json.farmacias` sí existía como un arreglo válido —aunque careciera de los
          //  campos requeridos—. Esto provocaba que la sección "Cómo llegar" dentro del
          //  modal de detalle mostrara invariablemente "No disponible", al no encontrar
          //  la propiedad `transport` en los objetos de farmacia/mascota.
          //
          //  SOLUCIÓN APLICADA:
          //  ──────────────────
          //  Se fuerza el uso de `FALLBACK.farmacias` y `FALLBACK.mascotas` (datos mock
          //  definidos en `src/data.ts`) que sí incluyen la estructura `TransportInfo`
          //  completa con sus rutas `micros[]`, `taxitrufis[]`, `trufis[]` y
          //  `radioTaxis[]`. Esto permite visualizar y probar la funcionalidad de
          //  transporte durante el desarrollo.
          //
          //  MIGRACIÓN FUTURA (cuando se conecte al CMS):
          //  ────────────────────────────────────────────
          //  1. Actualizar la hoja Google Sheets agregando las columnas necesarias:
          //     - `transport.micros`, `transport.taxitrufis`, `transport.trufis`,
          //       `transport.radioTaxis` (cada una como un arreglo de objetos con
          //       `name`, `flagColor`, `proximity`, `detail`).
          //     - `schedule[]` (arreglo de objetos con `day`, `open`, `hours`).
          //     - `phones[]`, `facebook`, `actionText` según corresponda.
          //  2. Modificar el endpoint de Google Apps Script para que devuelva estos
          //     campos en el JSON de respuesta.
          //  3. Revertir esta línea a: `farmacias: json.farmacias ?? FALLBACK.farmacias`
          //     (y lo mismo para `mascotas`).
          //
          //  NOTA: La sección "Negocios" sigue el mismo patrón (`FALLBACK.negocios`)
          //  porque sus tipos también fueron extendidos con campos que la hoja actual
          //  no posee. Una vez que el CMS esté completo, se unificará el tratamiento
          //  de todas las secciones.
          // ═══════════════════════════════════════════════════════════════════════════════════
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
    */
  }, []);

  return { ...data, loading, error };
}
