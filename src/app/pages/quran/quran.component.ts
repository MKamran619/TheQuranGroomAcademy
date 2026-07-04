import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuranService } from '../../core/services/quran.service';
import { QuranAyah } from '../../core/models';

interface SurahGroup {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayahs: QuranAyah[];
}

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero text-white py-20 px-4 text-center">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">Read the Holy Quran Online</h1>
      <p class="text-lg max-w-2xl mx-auto" style="color:rgba(255,255,255,0.8);">
        Select a Para (Juz) below to read its verses in Arabic with English translation.
      </p>
    </section>

    <!-- Para Selector -->
    <section class="py-12 px-4 bg-cream-100">
      <div class="max-w-5xl mx-auto">
        <h2 class="font-display text-xl font-bold mb-6 text-center" style="color:#0f3460;">Select a Para</h2>
        <div class="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
          @for (para of paraNumbers; track para) {
            <button (click)="selectPara(para)"
                    class="aspect-square rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                    [style]="para === selectedPara()
                      ? 'background: linear-gradient(135deg, #0f3460, #1a5276); color:white; box-shadow: 0 4px 14px rgba(15,52,96,0.35);'
                      : 'background:white; color:#0f3460; border:1px solid #e8e0d0;'">
              {{ para }}
            </button>
          }
        </div>
      </div>
    </section>

    <!-- Reader -->
    @if (selectedPara()) {
      <section class="py-12 px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="font-display text-2xl font-bold mb-8 text-center" style="color:#0f3460;">
            Para {{ selectedPara() }}
          </h2>

          @if (loading()) {
            <div class="space-y-6">
              @for (s of [1,2,3]; track s) {
                <div class="bg-white rounded-2xl p-6 animate-pulse" style="border:1px solid #e8e0d0;">
                  <div class="h-4 bg-gray-200 rounded-full w-1/3 mb-4"></div>
                  <div class="h-6 bg-gray-100 rounded-full w-full mb-3"></div>
                  <div class="h-4 bg-gray-100 rounded-full w-2/3"></div>
                </div>
              }
            </div>
          } @else if (error()) {
            <p class="text-center" style="color:#b91c1c;">{{ error() }}</p>
          } @else {
            <div class="space-y-10">
              @for (group of groupedAyahs(); track group.surahNumber) {
                <div>
                  <div class="text-center mb-4 pb-3 border-b" style="border-color:#e8e0d0;">
                    <h3 class="font-display text-lg font-bold" style="color:#c9a227;">
                      Surah {{ group.surahEnglishName }} ({{ group.surahName }})
                    </h3>
                  </div>
                  <div class="space-y-5">
                    @for (ayah of group.ayahs; track ayah.numberInQuran) {
                      <div class="bg-white rounded-2xl p-6" style="border:1px solid #e8e0d0; box-shadow: 0 2px 16px rgba(15,52,96,0.06);">
                        <div class="flex items-start gap-3">
                          <span class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                style="background:rgba(201,162,39,0.15); color:#c9a227;">
                            {{ ayah.numberInSurah }}
                          </span>
                          <div class="flex-1 min-w-0">
                            <p class="font-arabic text-2xl leading-loose mb-3" dir="rtl" style="color:#0f3460;">
                              {{ ayah.arabicText }}
                            </p>
                            <p class="text-sm" style="color:#4a5568;">{{ ayah.translationText }}</p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </section>
    }
  `,
})
export class QuranComponent {
  private quran = inject(QuranService);

  paraNumbers = this.quran.paraNumbers;
  selectedPara = signal<number | null>(null);
  ayahs = signal<QuranAyah[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  groupedAyahs = computed<SurahGroup[]>(() => {
    const groups: SurahGroup[] = [];
    for (const ayah of this.ayahs()) {
      const last = groups[groups.length - 1];
      if (last && last.surahNumber === ayah.surahNumber) {
        last.ayahs.push(ayah);
      } else {
        groups.push({
          surahNumber: ayah.surahNumber,
          surahName: ayah.surahName,
          surahEnglishName: ayah.surahEnglishName,
          ayahs: [ayah],
        });
      }
    }
    return groups;
  });

  selectPara(para: number) {
    this.selectedPara.set(para);
    this.loading.set(true);
    this.error.set(null);
    this.quran.getJuz(para).subscribe({
      next: ayahs => { this.ayahs.set(ayahs); this.loading.set(false); },
      error: () => {
        this.error.set('Unable to load this Para right now. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
