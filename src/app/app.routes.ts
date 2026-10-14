import { Routes } from '@angular/router';
import { UserForm } from './user-form/user-form';
import { Result } from './result/result';

export const routes: Routes = [
  { path: '', component: UserForm },
  { path: 'result', component: Result },
  { path: '**', redirectTo: '' }
];
