import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: UserListComponent },
  { path: 'nuevo-usuario', component: UserFormComponent },
  { path: 'usuario/:idusuario', component: UserViewComponent },
  { path: '**', redirectTo: 'home' }
];
