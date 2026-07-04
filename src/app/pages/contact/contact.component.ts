import { Component } from '@angular/core';
import { EvaluationFormComponent } from '../home/components/evaluation-form/evaluation-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [EvaluationFormComponent],
  template: `
    <!-- Page Hero -->
    <section class="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] text-white py-20 px-4 text-center">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
      <p class="text-lg text-white/80 max-w-2xl mx-auto">
        Ready to start your Quranic journey? Book your free trial class today — no commitment required.
      </p>
    </section>

    <!-- Evaluation / Contact Form -->
    <app-evaluation-form />
  `,
})
export class ContactComponent {}
