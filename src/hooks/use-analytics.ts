import { useState, useEffect } from 'react';

interface Analytics {
  id: number;
  listingId: number;
  views: number;
  clicks: number;
  conversions: number;
}

export function useAnalytics(listingId: number) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics/${listingId}`);
        const data = await response.json();
        setAnalytics(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch analytics');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [listingId]);

  return { analytics, loading, error };
}