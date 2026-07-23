'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

export default function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setHasStarted(true);
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!hasStarted) return null; // Avoid hydration mismatch

  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur text-center">
        {label && <p className="text-sm font-medium text-slate-300">{label}</p>}
        <p className="text-xl font-bold text-white mt-1">Event has started</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {label && <p className="text-sm font-medium text-brand-300 uppercase tracking-widest">{label}</p>}
      <div className="flex items-center gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight relative z-10">
                {unit.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-widest mt-0.5 relative z-10">
                {unit.label}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <div className="text-brand-400 text-2xl sm:text-3xl font-bold opacity-50 relative -top-1">
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
