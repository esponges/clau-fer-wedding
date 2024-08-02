'use client';

import { useEffect, useState } from 'react';

const initialCount = {
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0
};

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
    <div className='bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto'>
      <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
        Solo faltan
      </h2>
      <div className='flex text-2xl justify-center'>
        {`${count.days}d:${count.hours}h:${count.mins}m:${count.secs}s`}
        <span className='ml-4 text-indigo-600'>para el gran día!</span>
      </div>
    </div>
  );
}
