import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { EvaluationRequest } from '../../../../core/models';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluation-form.component.html',
})
export class EvaluationFormComponent implements OnInit {
  private api = inject(ApiService);
  submitting = signal(false);
  success = signal(false);
  error = signal('');
  courseOptions = signal<string[]>([]);

  form: EvaluationRequest = { fullName: '', email: '', phone: '', country: '', courseInterest: '', message: '' };

  benefits = [
    { title: 'Free Trial Class',              text: 'Experience our teaching style completely free before enrolling.' },
    { title: 'No Registration Fee',           text: 'Zero charges to register — just book and we will do the rest.' },
    { title: 'Matched Within 5 Working Days', text: 'We find the perfect female tutor for you within 5 working days.' },
    { title: '10% Sibling Discount',          text: 'Enrol siblings together and save 10% on monthly fees.' },
    { title: 'Flexible Timings',              text: 'Morning, afternoon, evening or night — your schedule, your choice.' },
  ];

  ngOnInit() {
    this.api.getCourses().subscribe({
      next: data => this.courseOptions.set([...data.map(c => c.title), 'Not sure yet']),
      error: () => this.courseOptions.set(['Noorani Qaida', 'Quran Reading', 'Quran Reading with Tajweed', 'Hifz-ul-Quran', 'Islamic Studies', 'Quran Translation', 'Not sure yet']),
    });
  }

  submit() {
    this.submitting.set(true);
    this.error.set('');
    this.api.submitEvaluationRequest(this.form).subscribe({
      next: () => { this.success.set(true); this.submitting.set(false); },
      error: () => { this.error.set('Something went wrong. Please try again.'); this.submitting.set(false); },
    });
  }
}
