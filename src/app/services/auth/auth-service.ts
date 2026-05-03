import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '@models/api/auth.model';
import { LOCAL_STORAGE } from '@enums/index';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly URL = `${environment.apiUrl}/auth`;

  currentUser = signal<User | null>(this.getUserFromStorage());

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.URL}/login`, { email, password }).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem(LOCAL_STORAGE.TOKEN, response.data.token);
          localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(response.data.user));
          this.currentUser.set(response.data.user);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.USER);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE.TOKEN);
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem(LOCAL_STORAGE.USER);
    return user ? JSON.parse(user) : null;
  }
}
