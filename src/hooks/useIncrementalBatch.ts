import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
//  Hook de carga incremental por lotes (Capa 1 — render)
// ═══════════════════════════════════════════════════════════════════════════════
//
//  Controla cuántos ítems se montan en el DOM a la vez. Inicialmente renderiza
//  `batchSize` ítems y, cuando el usuario se acerca al final del lote visible,
//  agrega `batchSize` ítems más al sub-arreglo ya renderizado (sin destruir ni
//  desmontar las tarjetas anteriores).
//
//  Este hook es una capa de rendimiento independiente del estado de conexión al
//  CMS (useSheetData.ts). Funciona igual con datos del FALLBACK local que con
//  datos provenientes de Google Sheets/Cloudinary el día que se migren, porque
//  solo recorta el arreglo que recibe — no le importa el origen de los datos.
//
//  Patrón de IntersectionObserver: el mismo que ya usa el proyecto para
//  mostrar/ocultar botones flotantes al hacer scroll (ver sentinelRef en
//  MascotasView.tsx, FarmaciasView.tsx, etc.).
//
//  CAPA 2 (futuro, no implementado): compresión/redimensionado de imágenes en
//  el navegador del usuario antes de subirlas, para reducir peso de archivo en
//  origen.
//
//  CAPA 3 (futuro, no implementado): migración de almacenamiento/entrega de
//  imágenes a Cloudinary (plan gratuito). Subida directa desde el navegador
//  vía "unsigned upload preset" (sin pasar por Apps Script), y URLs servidas
//  con parámetros f_auto (formato automático WebP/AVIF) y q_auto (compresión
//  automática) vía su CDN. Ver documento de arquitectura para el detalle de
//  límites del plan gratuito (25 créditos/mes compartidos entre almacenamiento,
//  ancho de banda y transformaciones).
// ═══════════════════════════════════════════════════════════════════════════════

interface UseIncrementalBatchResult<T> {
  /** Sub-arreglo de ítems actualmente montados en el DOM. */
  visibleItems: T[];
  /** Ref para el div sentinela — SIEMPRE debe estar montado en el DOM (no condicionar con hasMore). */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** `true` si quedan ítems por cargar más allá del lote actual. */
  hasMore: boolean;
}

/**
 * Hook de carga incremental por lotes para listas de tarjetas.
 *
 * @param items     - Arreglo completo de ítems (ya filtrados por búsqueda/categoría).
 * @param batchSize - Cantidad de ítems por lote (por defecto 5, decisión explícita del dueño).
 * @returns         - `visibleItems`, `sentinelRef` y `hasMore`.
 *
 * IMPORTANTE: El `<div ref={sentinelRef}>` debe estar SIEMPRE montado en el
 * JSX, sin envolver en `{hasMore && ...}`. Cuando no quedan ítems el observer
 * simplemente no incrementa el conteo. Condicionar el montaje del sentinela
 * causaba un loop de mount/unmount que producía parpadeo infinito.
 */
export function useIncrementalBatch<T>(
  items: T[],
  batchSize: number = 5,
): UseIncrementalBatchResult<T> {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Refs estables para que loadMore no dependa de items.length (evita recrear el observer)
  const itemsLengthRef = useRef(items.length);
  itemsLengthRef.current = items.length;

  const batchSizeRef = useRef(batchSize);
  batchSizeRef.current = batchSize;

  // ─── Reiniciar el conteo cuando cambia el arreglo fuente (filtros/búsqueda) ───
  // NOTA: No se compara solo por referencia de arreglo (`items !== prev`) porque
  // `.filter()` en los componentes padres crea un objeto nuevo en cada render,
  // aún cuando el contenido no cambió. Para evitar que loadMore → render →
  // reset → loadMore produzca un loop infinito de parpadeo, se calcula un
  // fingerprint ligero (longitud + identidad del primer y último elemento).
  // El arreglo solo se considera "nuevo" si ese fingerprint cambia, lo que
  // corresponde a un cambio real de filtro/búsqueda.
  const computeFingerprint = useCallback((arr: T[]): string => {
    if (arr.length === 0) return '0';
    const first = arr[0];
    const last = arr[arr.length - 1];
    const mid = arr[Math.floor(arr.length / 2)];
    // Usa identidad de objeto (referencia) como huella, no serialización
    return `${arr.length}|${(first as Record<string, unknown>)?.['id'] ?? '?'}|${(mid as Record<string, unknown>)?.['id'] ?? '?'}|${(last as Record<string, unknown>)?.['id'] ?? '?'}`;
  }, []);

  const prevFingerprintRef = useRef(computeFingerprint(items));

  useEffect(() => {
    const fp = computeFingerprint(items);
    if (fp !== prevFingerprintRef.current) {
      setVisibleCount(batchSizeRef.current);
      prevFingerprintRef.current = fp;
    }
  }, [items, computeFingerprint]);

  // ─── loadMore estable: nunca se recrea, lee de refs ───
  // Esto es CRÍTICO: si loadMore cambiara de referencia, el useEffect del
  // IntersectionObserver lo destruiría y re-crearía, lo cual dispara la
  // intersección inmediatamente otra vez y causa el loop de parpadeo.
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      if (prev >= itemsLengthRef.current) return prev; // ya se muestran todos
      const next = prev + batchSizeRef.current;
      return next > itemsLengthRef.current ? itemsLengthRef.current : next;
    });
  }, []); // ← Sin dependencias: lee de refs estables

  // ─── Observer estable: se crea UNA sola vez mientras el sentinela exista ───
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0, rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Clamp: si visibleCount supera el total (filtro redujo la lista), acotarlo
  const clampedCount = Math.min(visibleCount, items.length);
  const visibleItems = useMemo(() => items.slice(0, clampedCount), [items, clampedCount]);
  const hasMore = clampedCount < items.length;

  return { visibleItems, sentinelRef, hasMore };
}
