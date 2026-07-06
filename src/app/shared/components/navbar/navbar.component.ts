import { Component, HostListener, OnInit, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { ApiService } from '../../../core/services/api.service';
import { NavLink, SiteSetting } from '../../../core/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private api = inject(ApiService);

  menuOpen = signal(false);
  navLinks = signal<NavLink[]>([]);
  phone = signal('+44 20 7946 0853');
  phoneHref = signal('+442079460853');
  ctaLabel = signal('Free Trial Class');
  ctaLink = signal('/contact');

  // fallback nav links shown while loading
  private fallbackLinks: NavLink[] = [
    { id: 1, label: 'Home',       path: '/',        sort_order: 1, is_active: true },
    { id: 2, label: 'Courses',    path: '/courses', sort_order: 2, is_active: true },
    { id: 3, label: 'Read Quran', path: '/quran',   sort_order: 3, is_active: true },
    { id: 4, label: 'Pricing',    path: '/pricing', sort_order: 4, is_active: true },
    { id: 5, label: 'About',      path: '/about',   sort_order: 5, is_active: true },
    { id: 6, label: 'FAQ',        path: '/faq',     sort_order: 6, is_active: true },
    { id: 7, label: 'Contact',    path: '/contact', sort_order: 7, is_active: true },
  ];

  ngOnInit() {
    this.navLinks.set(this.fallbackLinks);

    this.api.getNavLinks().subscribe({
      next: links => { if (links.length) this.navLinks.set(links); },
      error: () => {}
    });

    this.api.getSiteSettings().subscribe({
      next: (settings: SiteSetting[]) => {
        const get = (key: string) => settings.find(s => s.key === key)?.value;
        if (get('phone'))            this.phone.set(get('phone')!);
        if (get('phone_href'))       this.phoneHref.set(get('phone_href')!);
        if (get('cta_button_label')) this.ctaLabel.set(get('cta_button_label')!);
        if (get('cta_button_link'))  this.ctaLink.set(get('cta_button_link')!);
      },
      error: () => {}
    });
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }

  @HostListener('document:keydown.escape')
  onEscape() { this.closeMenu(); }
}
