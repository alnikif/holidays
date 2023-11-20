import { useEffect, useRef } from 'react';

export const usePreviousValue = <T,>(value: T, initialValue?: T): T | undefined => {
  const ref = useRef<T | undefined>(initialValue);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
