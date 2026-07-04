import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { SiteStat } from '../../../../core/models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  private api = inject(ApiService);
  cards = signal<SiteStat[]>([]);
  heroImageUrl = signal('assets/images/hero-teacher.jpeg');

  offers = ['Free Trial Class', 'No Registration Fee', '10% Sibling Discount', 'Flexible Timings'];

  trustBadges = [
    { label: 'Qualified Female Teachers' },
    { label: 'Flexible Timings' },
    { label: 'Free Trial Class' },
    { label: 'No Registration Fee' },
  ];

  ngOnInit() {
    this.api.getSiteStats().subscribe({
      next: data => this.cards.set(data),
      error: () => {},
    });
    this.api.getSiteImages().subscribe({
      next: images => {
        const img = images.find(i => i.key === 'hero_main');
        if (img) this.heroImageUrl.set(this.api.imageUrl(img.image_key));
      },
      error: () => {},
    });
  }
}
