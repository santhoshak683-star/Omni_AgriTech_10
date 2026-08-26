export const formatTemperature = (celsius: number, unit: 'C' | 'F'): string => {
  if (unit === 'F') {
    const f = (celsius * 9) / 5 + 32;
    return `${f.toFixed(1)}°F`;
  }
  return `${celsius.toFixed(2)}°C`;
};

export const getStatusBadgeColor = (status: 'healthy' | 'at-risk' | 'critical') => {
  switch (status) {
    case 'healthy':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        pill: 'bg-emerald-100 text-emerald-700',
        label: 'OPTIMAL',
      };
    case 'at-risk':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        border: 'border-amber-200',
        text: 'text-amber-700',
        pill: 'bg-amber-100 text-amber-700',
        label: 'MONITORING',
      };
    case 'critical':
      return {
        bg: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-500',
        border: 'border-red-200',
        text: 'text-red-700',
        pill: 'bg-red-100 text-red-700',
        label: 'URGENT',
      };
  }
};

