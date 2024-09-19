'use client';

import { useEffect, useState } from 'react';

const initialCount = {
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
};

const CountdownItem = ({ value, label }: { value: string; label: string }) => (
  <div className='flex flex-col items-center'>
    <div className='text-2xl font-bold mb-2 w-20 text-center'>{value}</div>
    <div className='text-sm'>{label}</div>
  </div>
);

export function CountDown({ date }: { date: Date }) {
  const [count, setCount] = useState<{
    days: number;
    hours: number;
    mins: number;
    secs: number;
  }>(initialCount);

  useEffect(() => {
    function getDateTillEvent() {
      const now = new Date().getTime();
      const diffInMs = date.getTime() - now;
      const diffInSecs = Math.floor(diffInMs / 1000);

      if (diffInSecs < 0) {
        return initialCount;
      }

      const secsToDays = 86400; // 24 * 60 * 60
      const secsToHours = 3600; // 60 * 60
      const secsToMins = 60;

      const days = Math.floor(diffInSecs / secsToDays);
      const hours = Math.floor((diffInSecs % secsToDays) / secsToHours);
      const mins = Math.floor((diffInSecs % secsToHours) / secsToMins);
      const secs = diffInSecs % secsToMins;

      return {
        days,
        hours,
        mins,
        secs,
      };
    }

    const interval = setInterval(() => {
      const { days, hours, mins, secs } = getDateTillEvent();
      if (days <= 0 && hours <= 0 && mins <= 0 && secs <= 0) {
        clearInterval(interval);
        setCount({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        setCount({ days, hours, mins, secs });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <div className='shadow-lg rounded-lg p-6 max-w-2xl mx-auto'>
      <div className='grid grid-cols-4 gap-4 text-white'>
        <CountdownItem value={count.days.toString()} label='Días' />
        <CountdownItem
          value={count.hours.toString().padStart(2, '0')}
          label='Horas'
        />
        <CountdownItem
          value={count.mins.toString().padStart(2, '0')}
          label='Minutos'
        />
        <CountdownItem
          value={count.secs.toString().padStart(2, '0')}
          label='Segundos'
        />
      </div>
    </div>
  );
}
