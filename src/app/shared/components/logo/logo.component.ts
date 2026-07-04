import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  /** 'light' = on white/light bg (navy text), 'dark' = on dark bg (white text) */
  @Input() theme: 'light' | 'dark' = 'light';
  /** Size of the mark in px */
  @Input() size = 40;
}
