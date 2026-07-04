import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { Course } from '../../../../core/models';

@Component({
  selector: 'app-courses-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses-grid.component.html',
})
export class CoursesGridComponent implements OnInit {
  private api = inject(ApiService);
  courses = signal<Course[]>([]);
  loading = signal(true);
  error = signal('');

  promoOffers = ['Free Trial Class', 'No Registration Fee', '10% Sibling Discount', 'Flexible Timings for Women & Children'];

  ngOnInit() {
    this.api.getCourses().subscribe({
      next: data => { this.courses.set(data); this.loading.set(false); },
      error: () => { this.error.set('Could not load courses.'); this.loading.set(false); },
    });
  }

  imageUrl(key: string): string {
    return this.api.imageUrl(key);
  }
}
