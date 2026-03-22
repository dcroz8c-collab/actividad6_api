import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: UserListComponent },
  { path: 'usuario/:id', component: UserViewComponent },
  { path: 'nuevo-usuario', component: UserFormComponent },
  { path: '**', redirectTo: 'home' }
];