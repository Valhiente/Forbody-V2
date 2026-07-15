import React from 'react';

type HeadingVariant =
  | 'b2c-hero'
  | 'b2c-section'
  | 'b2b-hero'
  | 'b2b-section'
  | 'unit-hero'
  | 'unit-section';

type ElementTag = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
  as?: ElementTag;
  variant?: HeadingVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Heading({
  as: Tag = 'h2',
  variant = 'b2c-section',
  children,
  className = '',
}: HeadingProps) {
  const variants: Record<HeadingVariant, string> = {
    'b2c-hero':
      'text-6xl md:text-9xl font-black italic tracking-tighter uppercase text-gradient-b2c',
    'b2c-section':
      'text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white',
    'b2b-hero':
      'text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white',
    'b2b-section':
      'text-3xl md:text-4xl font-medium tracking-tight text-white',
    'unit-hero':
      'text-4xl md:text-5xl font-bold tracking-normal text-black capitalize',
    'unit-section':
      'text-2xl md:text-3xl font-bold tracking-normal text-gray-900',
  };

  return <Tag className={`${variants[variant]} ${className}`}>{children}</Tag>;
}
