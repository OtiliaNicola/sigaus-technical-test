import { Routes } from '@angular/router';
import { DeclarationsComponent } from './pages/declarations/declarations.component';

export const routes: Routes = [
  { path: '', redirectTo: '/gestion/declaraciones', pathMatch: 'full' },
  { path: 'gestion/declaraciones', component: DeclarationsComponent },
];
