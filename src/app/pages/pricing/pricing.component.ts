import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { PricingPlan } from '../../core/models';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <section class="page-hero text-white py-20 px-4 text-center">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
      <p class="text-lg max-w-2xl mx-auto" style="color:rgba(255,255,255,0.8);">
        Affordable monthly plans for every learner. No registration fee — start with a free trial class!
      </p>
    </section>

    <!-- Special Offers Banner -->
    <section class="py-5 px-4 border-y" style="background:rgba(201,162,39,0.08); border-color:rgba(201,162,39,0.25);">
      <div class="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-center">
        @for (offer of offers; track offer) {
          <span class="flex items-center gap-2 font-semibold text-sm" style="color:#0f3460;">
            <span style="color:#c9a227; font-size:1.1rem;">✓</span> {{ offer }}
          </span>
        }
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-16 px-4 bg-cream-100">
      <div class="max-w-6xl mx-auto">

        @if (loading()) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            @for (s of [1,2,3,4,5]; track s) {
              <div class="bg-white rounded-2xl p-8 w-full max-w-sm animate-pulse" style="border:1px solid #e8e0d0;">
                <div class="h-5 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                <div class="h-8 bg-gray-200 rounded-full w-1/2 mb-6"></div>
                <div class="space-y-3">
                  @for (f of [1,2,3,4,5]; track f) {
                    <div class="h-3 bg-gray-100 rounded-full"></div>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            @for (plan of plans(); track plan.title) {
              <div class="rounded-2xl p-8 w-full max-w-sm flex flex-col transition-all duration-300 hover:-translate-y-1"
                   [style]="plan.highlighted
                     ? 'background: linear-gradient(135deg, #0f3460, #1a5276); box-shadow: 0 8px 40px rgba(15,52,96,0.3); border: none;'
                     : 'background: white; border: 1px solid #e8e0d0; box-shadow: 0 2px 16px rgba(15,52,96,0.06);'">

                @if (plan.highlighted) {
                  <div class="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                       style="background:#c9a227; color:#0f3460;">Most Popular</div>
                }

                <div class="mb-6">
                  <h2 class="font-display text-xl font-bold mb-3" [style]="plan.highlighted ? 'color:white;' : 'color:#0f3460;'">
                    {{ plan.title }}
                  </h2>
                  <div class="text-3xl font-extrabold" style="color:#c9a227;">{{ plan.price }}</div>
                  <div class="text-sm mt-1" [style]="plan.highlighted ? 'color:rgba(255,255,255,0.6);' : 'color:#9ca3af;'">per month</div>
                </div>

                <ul class="space-y-3 flex-1 mb-8">
                  @for (feature of plan.features; track feature) {
                    <li class="flex items-start gap-2 text-sm">
                      <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="#c9a227" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span [style]="plan.highlighted ? 'color:rgba(255,255,255,0.85);' : 'color:#4a5568;'">{{ feature }}</span>
                    </li>
                  }
                </ul>

                <a routerLink="/contact"
                   class="block text-center font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                   [style]="plan.highlighted
                     ? 'background:#c9a227; color:#0f3460;'
                     : 'background: linear-gradient(135deg, #0f3460, #1a5276); color:white; box-shadow: 0 4px 14px rgba(15,52,96,0.25);'">
                  Enroll Now
                </a>
              </div>
            }
          </div>
        }

        <p class="text-center text-sm mt-12" style="color:#6b7280;">
          All prices are in Pakistani Rupees (PKR). Contact us for custom plans or group discounts.
        </p>
      </div>
    </section>
  `,
})
export class PricingComponent implements OnInit {
  private api = inject(ApiService);
  plans = signal<PricingPlan[]>([]);
  loading = signal(true);

  offers = ['Free Trial Class', 'No Registration Fee', '10% Sibling Discount', 'Flexible Timings'];

  ngOnInit() {
    this.api.getPricingPlans().subscribe({
      next: data => { this.plans.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
