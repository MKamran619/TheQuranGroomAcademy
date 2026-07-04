import { Component } from '@angular/core';
import { FaqComponent } from '../home/components/faq/faq.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqComponent],
  template: `
    <!-- Page Hero -->
    <section class="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] text-white py-20 px-4 text-center">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
      <p class="text-lg text-white/80 max-w-2xl mx-auto">
        Have questions? We have answers. Browse our most commonly asked questions below.
      </p>
    </section>

    <!-- FAQ Section -->
    <app-faq />
  `,
})
export class FaqPageComponent {}
