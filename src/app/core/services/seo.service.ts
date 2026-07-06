import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private base = 'The Quran Groom Academy';
  private siteUrl = 'https://thequrangroomacademy.com';
  private defaultImage = 'https://thequrangroomacademy.com/assets/images/hero-teacher.jpeg';

  constructor(private titleService: Title, private meta: Meta) {}

  update(config: SeoConfig) {
    const fullTitle = `${config.title} | ${this.base}`;
    const url = `${this.siteUrl}${config.canonical ?? ''}`;

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: this.defaultImage });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    // Canonical
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }
}
