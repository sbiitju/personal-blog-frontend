import { useState, useEffect } from 'react';

export const useDomain = () => {
  const [domain, setDomain] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  return domain;
};
