import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// Perubahan utama ada pada return type fungsi ini
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] { // <-- TIPE DIPERBARUI DI SINI
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(storedValue);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  // Kita kembalikan setStoredValue yang merupakan Dispatch<SetStateAction<T>>
  return [storedValue, setStoredValue];
}