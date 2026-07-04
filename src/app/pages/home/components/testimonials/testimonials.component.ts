import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Testimonial } from '../../../../core/models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent implements OnInit {
  private api = inject(ApiService);
  testimonials = signal<Testimonial[]>([]);
  loading = signal(true);
  activeIndex = signal(0);
  current = computed(() => this.testimonials()[this.activeIndex()]);

  ngOnInit() {
    this.api.getTestimonials().subscribe({
      next: data => { this.testimonials.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  prev() { this.activeIndex.update(i => (i - 1 + this.testimonials().length) % this.testimonials().length); }
  next() { this.activeIndex.update(i => (i + 1) % this.testimonials().length); }

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  stars(n: number): number[] { return Array(n).fill(0); }
}
