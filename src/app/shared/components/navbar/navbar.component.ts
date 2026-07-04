import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  menuOpen = signal(false);

  navLinks = [
    { label: 'Home',    path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Read Quran', path: '/quran' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About',   path: '/about' },
    { label: 'FAQ',     path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }

  @HostListener('document:keydown.escape')
  onEscape() { this.closeMenu(); }
}
