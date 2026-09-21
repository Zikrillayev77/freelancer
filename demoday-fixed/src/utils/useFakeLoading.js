import { useEffect, useState } from "react";

/**
 * Simulyatsiya qilingan "API so'rovi" — haqiqiy backend bo'lmagani uchun
 * loading skeletonlarni ko'rsatish imkonini beradi.
 */
export function useFakeLoading(deps = [], delay = 500) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return loading;
}
