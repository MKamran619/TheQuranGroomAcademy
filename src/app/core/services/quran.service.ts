import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { QuranAyah } from '../models';

interface AlQuranAyahDto {
  number: number;
  text: string;
  numberInSurah: number;
  surah: { number: number; name: string; englishName: string };
}

interface AlQuranEditionResponse {
  data: { ayahs: AlQuranAyahDto[] };
}

@Injectable({ providedIn: 'root' })
export class QuranService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.alquran.cloud/v1';

  readonly paraNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  getJuz(juzNumber: number): Observable<QuranAyah[]> {
    return forkJoin({
      arabic: this.http.get<AlQuranEditionResponse>(`${this.baseUrl}/juz/${juzNumber}/quran-uthmani`),
      translation: this.http.get<AlQuranEditionResponse>(`${this.baseUrl}/juz/${juzNumber}/en.asad`),
    }).pipe(
      map(({ arabic, translation }) =>
        arabic.data.ayahs.map((ayah, i) => ({
          numberInQuran: ayah.number,
          numberInSurah: ayah.numberInSurah,
          arabicText: ayah.text,
          translationText: translation.data.ayahs[i]?.text ?? '',
          surahNumber: ayah.surah.number,
          surahName: ayah.surah.name,
          surahEnglishName: ayah.surah.englishName,
        }))
      )
    );
  }
}
