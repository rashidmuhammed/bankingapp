import { Component } from '@angular/core';

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
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrl: './debit.component.css',
})
export class DebitComponent {
  private destroy$ = new Subject<void>();
  public id: string = '';
  public debitForm!: FormGroup;
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

    this.debitForm = this.fb.group({
      accountNumber: [
        '',
        Validators.required,
        [checkAccountNumberValidator(this.creditService, this.id)],
      ],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onFormSubmit() {
    let creditFormValues = this.debitForm.value;
    console.log(this.debitForm.value);
    if (this.debitForm.valid) {
      creditFormValues.userId = this.id;
      creditFormValues.date = Date.now();
      this.creditService
        .insertCredit(creditFormValues)
        .pipe(
          takeUntil(this.destroy$), // Unsubscribe upon component destruction
          switchMap((credit) => {
            console.log(credit, 'submitted');

            // Step 2: Update Balance
            const updatedAmount = creditFormValues.amount; // Assuming 'amount' is the value to add
            return this.creditService.updateDebitBalanceAmount(
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
              TransactionType: 'Debit', // Ensure this is the correct field name
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
