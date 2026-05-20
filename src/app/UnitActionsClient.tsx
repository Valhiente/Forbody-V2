"use client";

import type { UnitListItem } from "@/unit.types";

type UnitActionsClientProps = {
  unit: UnitListItem;
};

export default function UnitActionsClient({ unit }: UnitActionsClientProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        className="text-xs font-bold uppercase tracking-widest text-gray-400 transition hover:text-white"
        aria-label={`Editar unidade ${unit.name}`}
      >
        Editar
      </button>

      <button
        type="button"
        className="text-xs font-bold uppercase tracking-widest text-red-500 transition hover:text-red-400"
        aria-label={`Alterar status da unidade ${unit.name}`}
      >
        Status
      </button>
    </div>
  );
}