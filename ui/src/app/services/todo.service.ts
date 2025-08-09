import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo { id: string; title: string; done: boolean; tags: string[]; }

@Injectable({ providedIn: 'root' })
export class TodoService {
  // during dev we'll proxy /api to backend
  private base = '/api';
  constructor(private http: HttpClient) {}

  all(): Observable<Todo[]> { return this.http.get<Todo[]>(`${this.base}/todos`); }
  add(title: string): Observable<Todo> { return this.http.post<Todo>(`${this.base}/todos`, { title }); }
  toggle(id: string): Observable<void> { return this.http.post<void>(`${this.base}/todos/${id}/toggle`, {}); }
  addTag(id: string, tag: string): Observable<void> { return this.http.post<void>(`${this.base}/todos/${id}/tags`, { tag }); }
}
