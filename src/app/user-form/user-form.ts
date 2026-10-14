import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { phoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly userForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', phoneValidator],
    email: ['', Validators.email]
  });

  get firstName() {
    return this.userForm.controls.firstName;
  }

  get lastName() {
    return this.userForm.controls.lastName;
  }

  get phone() {
    return this.userForm.controls.phone;
  }

  get email() {
    return this.userForm.controls.email;
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) {
      return;
    }

    this.router.navigate(['/result'], { queryParams: this.userForm.getRawValue() });
  }
}
