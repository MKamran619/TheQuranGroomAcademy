import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { SiteStat } from '../../../../core/models';

@Component({
  selector: 'app-stats-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-banner.component.html',
})
export class StatsBannerComponent implements OnInit {
  private api = inject(ApiService);
  stats = signal<SiteStat[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getSiteStats().subscribe({
      next: data => { this.stats.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
