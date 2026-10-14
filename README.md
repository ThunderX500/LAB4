# SEG3502 — Lab 4

## Angular Reactive Form

The assessed exercise is an Angular application that collects a user's first name, last name, phone number, and email using a reactive form. It validates the required fields/formats and shows valid submitted data on a new page in a table.

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

## Completed — second half

- [x] Added the phone validator. The phone number is optional, but when supplied it must contain exactly 10 digits, with the **1st and 4th digits different from 0**.
- [x] Added `Validators.email` to the email control.
- [x] Added appropriate error messages for invalid phone and email values.
- [x] Created a separate result/display component.
- [x] Added a route for the result page.
- [x] Pass the valid submitted user data to the result page.
- [x] Display First Name, Last Name, Phone Number, and Email in a table on the result page.
- [x] Replaced the halfway-checkpoint message / console logging with the required navigation behavior.
- [x] Ran final validation tests and verified the production build.

## How to run

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

## How to test

```bash
npm test
```

Unit tests cover the custom phone validator, the form's validation and navigation behaviour, and the result page's table rendering and redirect.

```bash
npm run build
```

Produces the optimized production bundle in `dist/lab4`.

## Design notes

- The custom phone validator lives in `src/app/validators/phone.validator.ts`. It returns two
  distinct error keys — `phoneDigits` when the value is not exactly 10 digits and `phoneZeroDigit`
  when the 1st or 4th digit is `0` — so the form can show a specific message for each case. An
  empty value is valid, which keeps the field optional.
- Valid submissions are passed to the result page as **query parameters**
  (`/result?firstName=…&lastName=…&phone=…&email=…`). `Result` reads them from
  `ActivatedRoute.snapshot.queryParamMap`, so the page can be reloaded or shared. Opening `/result`
  without submitted data redirects back to the form.
- Tests run on the `@angular/build:unit-test` builder with the vitest runner, which matches the
  project's `@angular/build`-only toolchain. Karma is deprecated as of Angular 20.
