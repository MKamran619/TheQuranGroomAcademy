import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  email = '';
  currentYear = new Date().getFullYear();

  discoverLinks = [
    { label: 'About Us',    path: '/discover' },
    { label: 'Our Method',  path: '/discover' },
    { label: 'Our Tutors',  path: '/discover' },
    { label: 'Blog',        path: '/discover' },
  ];

  courseLinks = [
    { label: 'Noorani Qaida',               path: '/courses' },
    { label: 'Quran Reading',               path: '/courses' },
    { label: 'Quran Reading with Tajweed',  path: '/courses' },
    { label: 'Hifz-ul-Quran',              path: '/courses' },
    { label: 'Islamic Studies',             path: '/courses' },
    { label: 'Quran Translation',           path: '/courses' },
  ];

  helpLinks = [
    { label: 'FAQ',             path: '/faq' },
    { label: 'Contact Us',      path: '/contact' },
    { label: 'Privacy Policy',  path: '/privacy' },
    { label: 'Terms of Service',path: '/terms' },
  ];

  socials = [
    {
      label: 'Facebook', href: '#',
      svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`
    },
    {
      label: 'Instagram', href: '#',
      svg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>`
    },
    {
      label: 'YouTube', href: '#',
      svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>`
    },
    {
      label: 'Twitter/X', href: '#',
      svg: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
  ];

  onSubscribe() {
    if (this.email) {
      alert(`Subscribed: ${this.email}`);
      this.email = '';
    }
  }
}
