import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { ApiService } from '../../../core/services/api.service';
import { FooterLink, SiteSetting } from '../../../core/models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  private api = inject(ApiService);

  email = '';
  currentYear = new Date().getFullYear();

  phone        = signal('+44 20 7946 0853');
  phoneHref    = signal('+442079460853');
  address1     = signal('128, City Road, London');
  address2     = signal('EC1V 2NX, United Kingdom');
  tagline      = signal('Dedicated exclusively to women & children — qualified female teachers, personalised one-on-one classes from the comfort of your home.');
  facebookUrl  = signal('#');
  instagramUrl = signal('#');
  youtubeUrl   = signal('#');
  twitterUrl   = signal('#');

  discoverLinks = signal<FooterLink[]>([]);
  courseLinks   = signal<FooterLink[]>([]);
  helpLinks     = signal<FooterLink[]>([]);

  socials = signal([
    { label: 'Facebook',  get href() { return '#'; }, svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>` },
    { label: 'Instagram', get href() { return '#'; }, svg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>` },
    { label: 'YouTube',   get href() { return '#'; }, svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>` },
    { label: 'Twitter/X', get href() { return '#'; }, svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
  ]);

  ngOnInit() {
    this.api.getSiteSettings().subscribe({
      next: (settings: SiteSetting[]) => {
        const get = (key: string) => settings.find(s => s.key === key)?.value;
        if (get('phone'))           this.phone.set(get('phone')!);
        if (get('phone_href'))      this.phoneHref.set(get('phone_href')!);
        if (get('address_line1'))   this.address1.set(get('address_line1')!);
        if (get('address_line2'))   this.address2.set(get('address_line2')!);
        if (get('footer_tagline'))  this.tagline.set(get('footer_tagline')!);
        if (get('facebook_url'))    this.facebookUrl.set(get('facebook_url')!);
        if (get('instagram_url'))   this.instagramUrl.set(get('instagram_url')!);
        if (get('youtube_url'))     this.youtubeUrl.set(get('youtube_url')!);
        if (get('twitter_url'))     this.twitterUrl.set(get('twitter_url')!);

        this.socials.set([
          { label: 'Facebook',  href: get('facebook_url')  ?? '#', svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>` },
          { label: 'Instagram', href: get('instagram_url') ?? '#', svg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>` },
          { label: 'YouTube',   href: get('youtube_url')   ?? '#', svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>` },
          { label: 'Twitter/X', href: get('twitter_url')   ?? '#', svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
        ]);
      },
      error: () => {}
    });

    this.api.getFooterLinks().subscribe({
      next: (links: FooterLink[]) => {
        this.discoverLinks.set(links.filter(l => l.section === 'discover'));
        this.courseLinks.set(links.filter(l => l.section === 'courses'));
        this.helpLinks.set(links.filter(l => l.section === 'help'));
      },
      error: () => {
        this.discoverLinks.set([
          { id: 1, section: 'discover', label: 'About Us',   path: '/about', sort_order: 1, is_active: true },
          { id: 2, section: 'discover', label: 'Our Method', path: '/about', sort_order: 2, is_active: true },
          { id: 3, section: 'discover', label: 'Our Tutors', path: '/about', sort_order: 3, is_active: true },
        ]);
        this.courseLinks.set([
          { id: 4, section: 'courses', label: 'Quran Reading',  path: '/courses', sort_order: 1, is_active: true },
          { id: 5, section: 'courses', label: 'Hifz-ul-Quran', path: '/courses', sort_order: 2, is_active: true },
        ]);
        this.helpLinks.set([
          { id: 6, section: 'help', label: 'FAQ',        path: '/faq',     sort_order: 1, is_active: true },
          { id: 7, section: 'help', label: 'Contact Us', path: '/contact', sort_order: 2, is_active: true },
        ]);
      }
    });
  }

  onSubscribe() {
    if (this.email) {
      alert(`Subscribed: ${this.email}`);
      this.email = '';
    }
  }
}
