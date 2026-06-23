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
        <div className={`relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.2em] ${status.isOpen ? 'animate-pulse border-red-500 bg-red-600/20 text-red-100 shadow-[0_0_28px_rgba(239,68,68,0.45)]' : 'border-white/10 bg-white/5 text-slate-300'}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? 'animate-ping bg-red-400' : 'bg-slate-500'}`} />
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

      <div className="mt-6 rounded-2xl border border-red-600/30 bg-gradient-to-r from-red-600/15 via-red-600/5 to-transparent p-4 shadow-[0_0_24px_rgba(239,68,68,0.14)]">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-3 w-3 shrink-0 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.9)]" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-300">Atenção aos feriados</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
              Feriados: <span className="text-red-300">08:00 às 13:00</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
