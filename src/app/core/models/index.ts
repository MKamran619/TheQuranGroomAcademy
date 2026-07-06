// Supabase flat models (snake_case from DB, mapped to camelCase)

export interface Course {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  icon: string;
  badge: string;
  gradient: string;
  image_key: string;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  student_name: string;
  location: string;
  review_text: string;
  rating: number;
  sort_order: number;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface SiteStat {
  id: number;
  label: string;
  value: string;
  icon: string;
  sort_order: number;
}

export interface EvaluationRequest {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  courseInterest?: string;
  message?: string;
}

export interface PricingPlan {
  id: number;
  title: string;
  price: string;
  features: string[];
  highlighted: boolean;
  sort_order: number;
}

export interface WhyChooseUs {
  id: number;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface SiteImage {
  id: number;
  key: string;
  image_key: string;
}

export interface QuranAyah {
  numberInQuran: number;
  numberInSurah: number;
  arabicText: string;
  translationText: string;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  jwt: string;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
}

export interface NavLink {
  id: number;
  label: string;
  path: string;
  sort_order: number;
  is_active: boolean;
}

export interface FooterLink {
  id: number;
  section: string;
  label: string;
  path: string;
  sort_order: number;
  is_active: boolean;
}
