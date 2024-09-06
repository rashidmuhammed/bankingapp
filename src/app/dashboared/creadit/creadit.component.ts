import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserBankOperationService } from '../../services/user-bank-operation.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { checkAccountNumberValidator } from '../../customValidator';

@Component({
  selector: 'app-creadit',
  templateUrl: './creadit.component.html',
  styleUrl: './creadit.component.css',
})
export class CreaditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public id: string = '';
  public creditForm!: FormGroup;
  constructor(
    private creditService: UserBankOperationService,
    private route: Router,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((route: any) => {
      // console.log(route);
      this.id = route['id'];
      console.log(this.id);
    });

    this.creditForm = this.fb.group({
      accountNumber: [
        '',
        Validators.required,
        [checkAccountNumberValidator(this.creditService, this.id)],
      ],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onFormSubmit() {
    let creditFormValues = this.creditForm.value;
    console.log(this.creditForm.value);
    if (this.creditForm.valid) {
      creditFormValues.userId = this.id;
      creditFormValues.date = new Date();
      this.creditService
        .insertCredit(creditFormValues)
        .pipe(
          takeUntil(this.destroy$),
          switchMap((credit) => {
            console.log(credit, 'submitted');

            // Step 2: Update Balance
            const updatedAmount = creditFormValues.amount;
            return this.creditService.updateBalanceAmount(
              updatedAmount,
              this.id
            );
          }),
          switchMap((updatedBalance) => {
            console.log(updatedBalance, 'balance updated');

            // Step 3: Post to Transaction History API
            const transactionData = {
              userId: this.id,
              amount: creditFormValues.amount,
              currentBalance: updatedBalance.amountCurrnt,
              TransactionType: 'Credit',
              date: creditFormValues.date,
            };
            return this.creditService.postToTransactionHistory(transactionData);
          })
        )
        .subscribe({
          next: (response) => {
            console.log(response, 'transaction history updated');
          },
          error: (error) => console.log(error),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
