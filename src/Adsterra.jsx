import { useEffect } from 'react';

export default function Adsterra() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const existingScript = document.querySelector('script[src*="effectivecpmnetwork.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://pl30577872.effectivecpmnetwork.com/57/9b/dc/579bdc8b3705d2c7ca6ec16eb4d60dae.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
