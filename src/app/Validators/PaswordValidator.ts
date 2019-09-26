'use strict';

import {AbstractControl, ValidatorFn} from '@angular/forms';
import {User} from '../models/User';

export function PasswordConfirmValidator( user: User ): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {

    const validatorErrorObject = {
      'Confirmation': {
        value: control.value,
        errorMessage: 'Пароли не совпадают'
      }
    };

    const checkConfirm = user.userPassword === control.value;

    return checkConfirm ? null : validatorErrorObject ;

  };
}
