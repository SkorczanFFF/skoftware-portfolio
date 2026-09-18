import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import React, { useEffect, useState } from 'react';

import { hasAnalyticsConsent } from '@/components/CookieConsent';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    setAnalyticsAllowed(hasAnalyticsConsent());

    const onChange = () => setAnalyticsAllowed(hasAnalyticsConsent());
    window.addEventListener('cc:onChange', onChange);
    return () => window.removeEventListener('cc:onChange', onChange);
  }, []);

  return (
    <>
      {children}
      {analyticsAllowed && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
