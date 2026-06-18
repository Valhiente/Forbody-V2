'use client';

import { useEffect, useMemo, useState } from 'react';

type BusinessHour = {
  day: string;
  hours: string;
};

const dayLabels = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const shortDayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function parseTimeToMinutes(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return hour * 60 + minute;
}

function parseHours(value: string) {
  const normalized = value.replace(/\s/g, '');
  if (!normalized || normalized === 'Fechado') return null;

  const [open, close] = normalized.split('-');
  if (!open || !close) return null;

  const openMinutes = parseTimeToMinutes(open);
  const closeMinutes = parseTimeToMinutes(close);

  if (openMinutes === null || closeMinutes === null) return null;

  return { open, close, openMinutes, closeMinutes };
}

function getTodayHours(hours: BusinessHour[], currentDay: number) {
  return hours.find((item) => Number(item.day) === currentDay);
}

function findNextOpenDay(hours: BusinessHour[], currentDay: number, nowMinutes: number) {
  for (let offset = 0; offset <= 7; offset += 1) {
    const day = (currentDay + offset) % 7;
    const dayHours = getTodayHours(hours, day);
    const parsed = dayHours ? parseHours(dayHours.hours) : null;

    if (!parsed) continue;

    if (offset === 0 && parsed.openMinutes <= nowMinutes) continue;

    return { day, open: parsed.open };
  }

  return null;
}

export default function UnitBusinessHours({ hours }: { hours?: BusinessHour[] }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const status = useMemo(() => {
    if (!now || !hours?.length) {
      return {
        isOpen: false,
        title: 'Horários da unidade',
        message: 'Horários em sincronização.',
        today: null as BusinessHour | null,
      };
    }

    const currentDay = now.getDay();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const today = getTodayHours(hours, currentDay) || null;
    const parsed = today ? parseHours(today.hours) : null;

    if (parsed && nowMinutes >= parsed.openMinutes && nowMinutes < parsed.closeMinutes) {
      return {
        isOpen: true,
        title: 'Aberta agora',
        message: `Fecha hoje às ${parsed.close}`,
        today,
      };
    }

    const nextOpen = findNextOpenDay(hours, currentDay, nowMinutes);

    return {
      isOpen: false,
      title: 'Fechada agora',
      message: nextOpen ? `Abre ${nextOpen.day === currentDay ? 'hoje' : dayLabels[nextOpen.day].toLowerCase()} às ${nextOpen.open}` : 'Consulte a unidade pelo WhatsApp.',
      today,
    };
  }, [hours, now]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Funcionamento</p>
          <h2 className={`mt-3 text-3xl font-black uppercase ${status.isOpen ? 'text-red-500' : 'text-white'}`}>{status.title}</h2>
          <p className="mt-2 text-sm text-slate-300">{status.message}</p>
        </div>
        <div className={`rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.2em] ${status.isOpen ? 'border-red-600/40 bg-red-600/15 text-red-300' : 'border-white/10 bg-white/5 text-slate-300'}`}>
          {status.isOpen ? 'Aberta' : 'Fechada'}
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {(hours || []).map((item) => {
          const dayNumber = Number(item.day);
          const isToday = now?.getDay() === dayNumber;
          const parsed = parseHours(item.hours);

          return (
            <div
              key={item.day}
              className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-sm ${isToday ? 'border-red-600/50 bg-red-600/10 text-white' : 'border-white/10 bg-white/[0.03] text-slate-300'}`}
            >
              <div>
                <p className="font-black uppercase tracking-[0.16em]">{shortDayLabels[dayNumber]}</p>
                <p className="mt-1 text-xs text-slate-500">{dayLabels[dayNumber]}</p>
              </div>
              <p className="font-black text-white">{parsed ? `${parsed.open} às ${parsed.close}` : item.hours}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-slate-500">
        Feriados: 08:00 às 13:00. Horários cadastrados manualmente pela equipe Forbody.
      </p>
    </div>
  );
}
