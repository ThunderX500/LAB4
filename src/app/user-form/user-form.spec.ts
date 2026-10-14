import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserForm } from './user-form';

describe('UserForm', () => {
  let fixture: ComponentFixture<UserForm>;
  let component: UserForm;
  let navigate: ReturnType<typeof vi.fn>;

  const validUser = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    phone: '5551234567',
    email: 'ada@example.com'
  };

  beforeEach(async () => {
    navigate = vi.fn().mockResolvedValue(true);

    await TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [{ provide: Router, useValue: { navigate } }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function errorMessages(): string[] {
    return Array.from(fixture.nativeElement.querySelectorAll('p.error')).map((element) =>
      (element as HTMLElement).textContent?.trim() ?? ''
    );
  }

  it('starts invalid because the names are required', () => {
    expect(component.firstName.hasError('required')).toBe(true);
    expect(component.lastName.hasError('required')).toBe(true);
    expect(component.userForm.invalid).toBe(true);
  });

  it('shows the required-name messages and does not navigate on an empty submit', () => {
    component.onSubmit();
    fixture.detectChanges();

    expect(errorMessages()).toEqual(['First name is required.', 'Last name is required.']);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('accepts a blank phone number', () => {
    component.userForm.setValue({ ...validUser, phone: '' });

    expect(component.phone.valid).toBe(true);
    expect(component.userForm.valid).toBe(true);
  });

  it('reports a phone number that is not exactly 10 digits', () => {
    component.userForm.setValue({ ...validUser, phone: '12345' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.phone.hasError('phoneDigits')).toBe(true);
    expect(errorMessages()).toEqual(['Phone number must be exactly 10 digits.']);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('reports a phone number whose 1st or 4th digit is 0', () => {
    component.userForm.setValue({ ...validUser, phone: '5550234567' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.phone.hasError('phoneZeroDigit')).toBe(true);
    expect(errorMessages()).toEqual(['The 1st and 4th digits cannot be 0.']);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('reports an email that does not match the email pattern', () => {
    component.userForm.setValue({ ...validUser, email: 'not-an-email' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.email.hasError('email')).toBe(true);
    expect(errorMessages()).toEqual(['Enter a valid email address.']);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('navigates to the result page with the submitted values as query params', () => {
    component.userForm.setValue(validUser);
    component.onSubmit();
    fixture.detectChanges();

    expect(errorMessages()).toEqual([]);
    expect(navigate).toHaveBeenCalledWith(['/result'], { queryParams: validUser });
  });
});
