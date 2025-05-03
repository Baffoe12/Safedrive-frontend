import React, { useEffect, useState, useMemo } from 'react';

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch stats');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Memoize stats calculations
  const displayStats = useMemo(() => ({
    accidents: stats?.total_accidents ?? 0,
    maxAlcohol: stats?.max_alcohol ?? 0,
    avgAlcohol: (stats?.avg_alcohol ?? 0).toFixed(2),
    maxImpact: stats?.max_impact ?? 0,
    violations: stats?.seatbelt_violations ?? 0,
    currentLocation: stats?.current_location ?? { lat: 0, lng: 0 },
    gpsValid: stats?.gps_valid ?? false,
    lastUpdate: stats?.last_update ?? null
  }), [stats]);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>{error}</div>;

  // ... existing render code ...
};

export default StatsCards;
