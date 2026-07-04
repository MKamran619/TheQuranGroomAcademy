import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CoursesGridComponent } from './components/courses-grid/courses-grid.component';
import { StatsBannerComponent } from './components/stats-banner/stats-banner.component';
import { ValuePropsComponent } from './components/value-props/value-props.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqComponent } from './components/faq/faq.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    CoursesGridComponent,
    StatsBannerComponent,
    ValuePropsComponent,
    TestimonialsComponent,
    FaqComponent,
    EvaluationFormComponent,
  ],
  template: `
    <app-hero />
    <app-courses-grid />
    <app-stats-banner />
    <app-value-props />
    <app-testimonials />
    <app-faq />
    <app-evaluation-form />
  `,
})
export class HomeComponent {}
