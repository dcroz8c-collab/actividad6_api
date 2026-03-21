import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  private httpClient = inject(HttpClient);
  private apiUrl: string = 'https://peticiones.online/users';

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl);
  }

  constructor() { }
}

