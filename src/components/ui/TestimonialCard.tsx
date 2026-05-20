import React from 'react';
import { Testimonial } from '@/app';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className={`bg-[#0a0a0a] border border-gray-800 p-8 relative group hover:border-red-600/50 transition-colors shadow-xl ${testimonial.offsetClass}`}>
      <div className="absolute top-0 right-0 p-6 text-red-600/20 group-hover:text-red-600/40 transition-colors">
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
      <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed min-h-[100px]">{testimonial.text}</p>
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-full bg-gray-700 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all"
          style={{ backgroundImage: `url('${testimonial.avatarUrl}')` }}
        ></div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm">{testimonial.name}</h4>
          <div className="flex text-red-600 text-sm mt-1 tracking-widest">
            {'★'.repeat(testimonial.rating)}
          </div>
        </div>
      </div>
    </div>
  );
}