import { FormControl } from '@angular/forms';
import { phoneValidator } from './phone.validator';

function control(value: string): FormControl<string> {
  return new FormControl(value, { nonNullable: true });
}

describe('phoneValidator', () => {
  it('accepts an empty value because the phone number is optional', () => {
    expect(phoneValidator(control(''))).toBeNull();
    expect(phoneValidator(control('   '))).toBeNull();
  });

  it('accepts 10 digits with non-zero 1st and 4th digits', () => {
    expect(phoneValidator(control('5551234567'))).toBeNull();
  });

  it('only constrains the 1st and 4th digits', () => {
    expect(phoneValidator(control('1002234567'))).toBeNull();
  });

  it('rejects a value that is not exactly 10 digits', () => {
    expect(phoneValidator(control('555123456'))).toEqual({ phoneDigits: true });
    expect(phoneValidator(control('55512345678'))).toEqual({ phoneDigits: true });
  });

  it('rejects a value containing non-digit characters', () => {
    expect(phoneValidator(control('555-123-4567'))).toEqual({ phoneDigits: true });
  });

  it('rejects a 1st digit of 0', () => {
    expect(phoneValidator(control('0551234567'))).toEqual({ phoneZeroDigit: true });
  });

  it('rejects a 4th digit of 0', () => {
    expect(phoneValidator(control('5550234567'))).toEqual({ phoneZeroDigit: true });
  });
});
