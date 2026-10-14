import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = (control.value ?? '').trim();

  if (value === '') {
    return null;
  }

  if (!/^\d{10}$/.test(value)) {
    return { phoneDigits: true };
  }

  if (value[0] === '0' || value[3] === '0') {
    return { phoneZeroDigit: true };
  }

  return null;
}
