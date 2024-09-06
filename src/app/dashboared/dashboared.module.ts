import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboaredRoutingModule } from './dashboared-routing.module';
import { HomeComponent } from './home/home.component';
import { CreaditComponent } from './creadit/creadit.component';
import { DebitComponent } from './debit/debit.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    HomeComponent,
    CreaditComponent,
    DebitComponent,
    TransactionHistoryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboaredRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboaredModule {}
