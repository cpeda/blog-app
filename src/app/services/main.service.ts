import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blog, BlogFormData } from '../app-interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private URL = 'https://blog-api-flax-rho.vercel.app';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.URL}/blogs`).pipe(
      catchError(this.handleError)
    );
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/blogs/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createBlog(data: BlogFormData): Observable<any> {
    return this.http.post(`${this.URL}/blogs`, data).pipe(
      catchError(this.handleError)
    );
  }

  updateBlog(id: number, data: BlogFormData): Observable<any> {
    return this.http.put(`${this.URL}/blogs/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/blogs/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(
      () => new Error('Error al procesar la solicitud. Por favor, intenta nuevamente.')
    );
  }
}




