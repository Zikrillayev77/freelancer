import { useState, useEffect } from "react";

/**
 * useDebounce — qiymatni belgilangan vaqt (ms) o'tgandan keyin qaytaradi.
 * Qidiruv inputlarida keraksiz re-renderlar va filtrlarni kamaytiradi.
 *
 * @param {*} value   - Kuzatiladigan qiymat
 * @param {number} delay - Milliseconds (default: 350)
 */
function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
