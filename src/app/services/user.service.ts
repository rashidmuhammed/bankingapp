import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../models/authentication';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetailsURL = 'http://localhost:3000/userDetails';
  verifyACNoUniqunessURL = 'http://localhost:3000/userDetails?accountNumber=';

  constructor(private http: HttpClient) {}

  insertUser(data: User): Observable<User[]> {
    return this.http.post<User[]>(this.userDetailsURL, data);
  }

  checkAccountNumber(acountNumber: string): Observable<User[]> {
    return this.http.get<User[]>(this.verifyACNoUniqunessURL + acountNumber);
  }

  userAuthentication(userData: Authentication): Observable<Authentication[]> {
    return this.http.get<Authentication[]>(
      `http://localhost:3000/userDetails?accountNumber=${userData.accountNumber}&password=${userData.password}`
    );
  }
}
