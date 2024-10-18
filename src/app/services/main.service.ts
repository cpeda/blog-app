import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.URL}/blogs`);
  }

  createBlog(data: any): Observable<any> {
    return this.http.post(`${this.URL}/blogs`, data);
  }

  // Nuevo método para eliminar un blog por ID
  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/blogs/${id}`);
  }
}

