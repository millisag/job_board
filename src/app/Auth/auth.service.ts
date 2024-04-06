import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // backend API URL
  private loggedInUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInUserSubject.asObservable();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInUserSubject.next(true);
        }
      })
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInUserSubject.next(false);
  }
}

