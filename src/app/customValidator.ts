import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserBankOperationService } from './services/user-bank-operation.service'; // Adjust the import as necessary

export function checkAccountNumberValidator(
  creditService: UserBankOperationService,
  id: string
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> => {
    if (!control.value) {
      return of(null); // Return null if no value
    }

    return creditService.getUserByAccountNumberAndId(control.value, id).pipe(
      map((ac) => (ac.length > 0 ? null : { notMatchError: true })),
      catchError(() => of({ notMatchError: true })) // Handle errors
    );
  };
}
