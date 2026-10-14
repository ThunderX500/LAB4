import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { Result } from './result';

describe('Result', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  function cellValues(): string[] {
    return Array.from(harness.routeNativeElement?.querySelectorAll('td') ?? []).map((cell) =>
      cell.textContent?.trim() ?? ''
    );
  }

  it('displays the submitted data passed through the query params in a table', async () => {
    await harness.navigateByUrl(
      '/result?firstName=Ada&lastName=Lovelace&phone=5551234567&email=ada@example.com',
      Result
    );

    expect(cellValues()).toEqual(['Ada', 'Lovelace', '5551234567', 'ada@example.com']);
  });

  it('labels every row of the table', async () => {
    await harness.navigateByUrl('/result?firstName=Ada&lastName=Lovelace', Result);

    const labels = Array.from(harness.routeNativeElement?.querySelectorAll('th') ?? []).map(
      (header) => header.textContent?.trim() ?? ''
    );

    expect(labels).toEqual(['First Name', 'Last Name', 'Phone Number', 'Email']);
  });

  it('marks an omitted phone number as not provided', async () => {
    await harness.navigateByUrl('/result?firstName=Ada&lastName=Lovelace&phone=&email=', Result);

    expect(cellValues()).toEqual(['Ada', 'Lovelace', 'Not provided', 'Not provided']);
  });

  it('goes back to the form when the page is opened without submitted data', async () => {
    await harness.navigateByUrl('/result');

    expect(TestBed.inject(Router).url).toBe('/');
  });
});
