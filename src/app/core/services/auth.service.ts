import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'qg_jwt';
  private readonly USER_KEY = 'qg_user';

  private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(identifier: string, password: string): Observable<{ jwt: string; user: AuthUser }> {
    return this.http
      .post<{ jwt: string; user: AuthUser }>(`${environment.supabaseUrl}/auth/v1/token?grant_type=password`, {
        identifier,
        password,
      })
      .pipe(
        tap(({ jwt, user }) => {
          localStorage.setItem(this.TOKEN_KEY, jwt);
          const authUser = { ...user, jwt };
          localStorage.setItem(this.USER_KEY, JSON.stringify(authUser));
          this.currentUserSubject.next(authUser);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
