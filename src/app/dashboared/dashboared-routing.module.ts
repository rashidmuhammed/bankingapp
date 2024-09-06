import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreaditComponent } from './creadit/creadit.component';
import { DebitComponent } from './debit/debit.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'credit/:id', component: CreaditComponent },
      { path: 'debit/:id', component: DebitComponent },
      {
        path: 'transaction/:id',
        component: TransactionHistoryComponent,
        canActivateChild: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboaredRoutingModule {}
