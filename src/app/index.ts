import React from 'react';

// ==========================================
// MODELOS DO BANCO DE DADOS (SUPABASE READY)
// ==========================================

export interface Promotion {
  id: string;
  title: string;
  tagline: string;
  price: string;
  isActive: boolean;
}

export interface Modality {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  avatarUrl: string;
  rating: number;
  offsetClass?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  installments?: number;
  priceSuffix?: string;
  priceDisclaimer?: string;
  features: string[];
  ctaText: string;
  isHighlighted?: boolean;
  highlightBadge?: string;
  checkoutUrl?: string;
}

export interface Unit {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  evoId: number;
  googleReviewsScore: number;
  googleReviewsCount: number;
  address: string;
  whatsapp: string;
  instagram?: string;
  mapEmbedUrl?: string;
  businessHours?: {
    day: string;
    hours: string;
  }[];
  galleryUrls?: string[];
  teachers?: {
    name: string;
    role: string;
    avatarUrl: string;
  }[];
}
// --- B2B TYPES (Investidores) ---
export interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
  iconSvg: React.ReactNode;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
}