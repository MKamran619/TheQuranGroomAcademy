import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { WhyChooseUs } from '../../../../core/models';

@Component({
  selector: 'app-value-props',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './value-props.component.html',
})
export class ValuePropsComponent implements OnInit {
  private api = inject(ApiService);
  props = signal<WhyChooseUs[]>([]);
  loading = signal(true);
  aboutImageUrl = signal('assets/images/registration-scene.jpeg');

  ngOnInit() {
    this.api.getWhyChooseUs().subscribe({
      next: data => { this.props.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
    this.api.getSiteImages().subscribe({
      next: images => {
        const img = images.find(i => i.key === 'about_section');
        if (img) this.aboutImageUrl.set(this.api.imageUrl(img.image_key));
      },
      error: () => {},
    });
  }
}
