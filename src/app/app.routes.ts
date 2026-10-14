import { Routes } from '@angular/router';
import { UserForm } from './user-form/user-form';

export const routes: Routes = [
  { path: '', component: UserForm },
  { path: '**', redirectTo: '' }
];
