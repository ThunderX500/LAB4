import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface SubmittedUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-result',
  imports: [RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  user: SubmittedUser = { firstName: '', lastName: '', phone: '', email: '' };
  hasData = false;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;

    this.user = {
      firstName: params.get('firstName') ?? '',
      lastName: params.get('lastName') ?? '',
      phone: params.get('phone') ?? '',
      email: params.get('email') ?? ''
    };

    this.hasData = this.user.firstName !== '' && this.user.lastName !== '';

    if (!this.hasData) {
      this.router.navigate(['/']);
    }
  }
}
