import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Course, Testimonial, Faq, SiteStat, EvaluationRequest, PricingPlan, WhyChooseUs, SiteImage } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private db = inject(SupabaseService).client;

  getCourses(): Observable<Course[]> {
    return from(
      this.db.from('courses').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as Course[];
    }));
  }

  getTestimonials(): Observable<Testimonial[]> {
    return from(
      this.db.from('testimonials').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    }));
  }

  getFaqs(): Observable<Faq[]> {
    return from(
      this.db.from('faqs').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as Faq[];
    }));
  }

  getSiteStats(): Observable<SiteStat[]> {
    return from(
      this.db.from('site_stats').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as SiteStat[];
    }));
  }

  getPricingPlans(): Observable<PricingPlan[]> {
    return from(
      this.db.from('pricing_plans').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as PricingPlan[];
    }));
  }

  getWhyChooseUs(): Observable<WhyChooseUs[]> {
    return from(
      this.db.from('why_choose_us').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as WhyChooseUs[];
    }));
  }

  getSiteImages(): Observable<SiteImage[]> {
    return from(
      this.db.from('site_images').select('*')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []) as SiteImage[];
    }));
  }

  imageUrl(imageKey: string): string {
    return `${environment.storageBaseUrl}/${imageKey}`;
  }

  submitEvaluationRequest(payload: EvaluationRequest): Observable<void> {
    return from(
      this.db.from('evaluation_requests').insert({
        full_name:       payload.fullName,
        email:           payload.email,
        phone:           payload.phone ?? '',
        country:         payload.country ?? '',
        course_interest: payload.courseInterest ?? '',
        message:         payload.message ?? '',
      })
    ).pipe(map(({ error }) => {
      if (error) throw error;
    }));
  }
}
