import { useState, useEffect } from 'react';

export default function LocalTimePill() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-[family-name:var(--font-mono)] text-[var(--color-text-secondary)] shadow-xs transition-colors hover:border-[var(--color-text-primary)]"
      title="Current local time in Kerala, India (IST)"
    >
      <span>
        Kerala, IN
        {timeStr ? ` · ${timeStr} IST` : ' · IST'}
      </span>
    </div>
  );
}
