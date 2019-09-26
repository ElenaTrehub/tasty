'use strict';

import {AbstractControl, ValidatorFn} from '@angular/forms';

export function DescriptionLengthValidator( min: number , max: number ): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {

    const validatorErrorObject = {
      'Description': {
        value: control.value,
      }
    };

    const clearString = control.value.trim();

    const checkConfirm = clearString.length >= min && clearString.length <= max;

    return checkConfirm ? null : validatorErrorObject ;

  };
}
