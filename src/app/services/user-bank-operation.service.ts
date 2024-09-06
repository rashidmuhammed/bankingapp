import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Credit } from '../models/credit';
import { User } from '../models/user';
import { THistorey } from '../models/thistorey';

@Injectable({
  providedIn: 'root',
})
export class UserBankOperationService {
  public userAcBalanceUrl = 'http://localhost:3000/userBank';
  public userCreditUrl = ' http://localhost:3000/credit';
  public userDebitUrl = 'http://localhost:3000/debit';
  public userThistory = 'http://localhost:3000/tHistroy';
  public getUserHistory = 'http://localhost:3000/tHistroy?userId=';

  constructor(private http: HttpClient) {}

  insertCredit(data: Credit): Observable<Credit[]> {
    return this.http.post<Credit[]>(this.userCreditUrl, data);
  }

  insertdebit(data: Credit): Observable<Credit[]> {
    return this.http.post<Credit[]>(this.userDebitUrl, data);
  }

  getUserByAccountNumberAndId(ac: string, id: string): Observable<User[]> {
    console.log(id);
    return this.http.get<User[]>(
      `http://localhost:3000/userDetails?accountNumber=${ac}&id=${id}`
    );
  }

  updateBalanceAmount(creditAmount: number, userId: string): Observable<any> {
    // Step 1: Get current user data by userId
    return this.http
      .get<any[]>(`http://localhost:3000/userBank?userId=${userId}`)
      .pipe(
        switchMap((userBankData) => {
          if (!userBankData || userBankData.length === 0) {
            throw new Error('User not found.');
          }

          const userBank = userBankData[0];
          const updatedAmount = userBank.amountCurrnt + creditAmount;

          return this.http.put<any>(
            `http://localhost:3000/userBank/${userBank.id}`,
            { ...userBank, amountCurrnt: updatedAmount }
          );
        })
      );
  }

  updateDebitBalanceAmount(
    creditAmount: number,
    userId: string
  ): Observable<any> {
    // Step 1: Get current user data by userId
    return this.http
      .get<any[]>(`http://localhost:3000/userBank?userId=${userId}`)
      .pipe(
        switchMap((userBankData) => {
          if (!userBankData || userBankData.length === 0) {
            throw new Error('User not found.');
          }

          const userBank = userBankData[0];
          const updatedAmount = userBank.amountCurrnt - creditAmount;

          return this.http.put<any>(
            `http://localhost:3000/userBank/${userBank.id}`,
            { ...userBank, amountCurrnt: updatedAmount }
          );
        })
      );
  }

  postToTransactionHistory(data: THistorey): Observable<THistorey[]> {
    return this.http.post<THistorey[]>(this.userThistory, data);
  }

  getTransactionHistory(id: string): Observable<THistorey[]> {
    return this.http.get<THistorey[]>(this.getUserHistory + id);
  }
}
