import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private apiUrl: string = 'https://peticiones.online/api/users';

  getAll(): Observable<{ results: IUser[] }> {
    return this.httpClient.get<{ results: IUser[] }>(this.apiUrl);
  }

  getById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiUrl}/${id}`);
  }

  create(user: Omit<IUser, '_id'>): Observable<IUser> {
    return this.httpClient.post<IUser>(this.apiUrl, user);
  }

  update(id: string, user: Partial<IUser>): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
