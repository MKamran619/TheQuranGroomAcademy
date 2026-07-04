import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Faq } from '../../../../core/models';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
})
export class FaqComponent implements OnInit {
  private api = inject(ApiService);
  items = signal<Faq[]>([]);
  loading = signal(true);
  open = signal<number | null>(null);

  ngOnInit() {
    this.api.getFaqs().subscribe({
      next: data => { this.items.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  toggle(i: number) { this.open.update(v => v === i ? null : i); }
}
