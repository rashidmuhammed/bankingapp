import { Component, OnInit } from '@angular/core';
import { UserBankOperationService } from '../../services/user-bank-operation.service';
import { THistorey } from '../../models/thistorey';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent implements OnInit {
  private transactions: THistorey[] = [];
  displayedTransactions: THistorey[] = []; // Transactions to display per page
  pageSize = 5; // Number of items per page
  currentPage = 1; // Current page number
  totalSize = 0;
  id: string = '';

  constructor(
    private transactionService: UserBankOperationService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((route: any) => {
      // console.log(route);
      this.id = route['id'];
      console.log(this.id);
    });

    this.fetchTransactions();
  }

  fetchTransactions() {
    this.transactionService
      .getTransactionHistory(this.id)
      .subscribe((data: any[]) => {
        this.transactions = data;
        console.log(this.transactions);
        this.totalSize = data.length;
        this.updateDisplayedTransactions();
      });
  }

  updateDisplayedTransactions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTransactions = this.transactions.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalSize / this.pageSize);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedTransactions();
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  getDate(timestamp: number) {
    return new Date(timestamp);
  }
}
