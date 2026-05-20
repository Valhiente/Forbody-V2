import React from 'react';
import { Metric } from '@/app';

export default function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="bg-[#141414] border border-gray-800 p-10 rounded hover:border-red-600/40 transition-colors group">
      <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity text-red-600">
        {metric.iconSvg}
      </div>
      <h3 className="text-5xl font-light text-white mb-2">{metric.value}</h3>
      <div className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-4">{metric.label}</div>
      <p className="text-gray-500 text-sm leading-relaxed">{metric.description}</p>
    </div>
  );
}