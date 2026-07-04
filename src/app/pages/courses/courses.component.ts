import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesGridComponent } from '../home/components/courses-grid/courses-grid.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, CoursesGridComponent],
  template: `
    <!-- Page Hero -->
    <section class="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] text-white py-20 px-4 text-center">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
      <p class="text-lg text-white/80 max-w-2xl mx-auto">
        Explore our wide range of Quran and Islamic studies courses designed for women and children.
      </p>
    </section>

    <!-- Courses Grid -->
    <app-courses-grid />
  `,
})
export class CoursesComponent {}
