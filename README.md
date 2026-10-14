# SEG3502 — Lab 4

## Angular Reactive Form


The assessed exercise is an Angular application that collects a user's first name, last name, phone number, and email using a reactive form. A completed version must validate the required fields/formats and show valid submitted data on a new page in a table.

## Completed — first half

- [x] Initialized an Angular 20 standalone application.
- [x] Added Angular Router and a root form route.
- [x] Created a reactive user-information form with four controls:
  - First Name
  - Last Name
  - Phone Number
  - Email
- [x] Added `Validators.required` to First Name and Last Name.
- [x] Added visible validation messages for missing First Name / Last Name.
- [x] Added a submit handler that marks the form controls as touched and only accepts the current form when valid.
- [x] Added basic styling so the form is readable and easy to test.

## Remaining — second half

- [ ] Add the phone validator. The phone number is optional, but when supplied it must contain exactly 10 digits, with the **1st and 4th digits different from 0**.
- [ ] Add `Validators.email` to the email control.
- [ ] Add appropriate error messages for invalid phone and email values.
- [ ] Create a separate result/display component.
- [ ] Add a route for the result page.
- [ ] Pass the valid submitted user data to the result page.
- [ ] Display First Name, Last Name, Phone Number, and Email in a table on the result page.
- [ ] Replace the current halfway-checkpoint message / console logging with the required navigation behavior.
- [ ] Run final validation tests and verify the production build.

## How to run

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

## Current checkpoint

The project is deliberately stopped after the form structure and the two required-name validations. This keeps the repository at roughly half of the exercise while leaving the phone/email validation and the separate results page as the main remaining work.
