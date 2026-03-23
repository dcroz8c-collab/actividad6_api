import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent implements OnInit {
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public user = signal<IUser | undefined | null>(undefined);

ngOnInit() {
  this.activatedRoute.params.subscribe((params) => {
    const id = params['id'];
    this.user.set(undefined);
    this.usersService.getById(id).subscribe({
      next: (response) => {
        if (response && response._id) {
          this.user.set(response);
        } else {
          this.user.set(null);
        }
      },
      error: (err) => {
        console.error('Error en la API:', err);
        this.user.set(null);
      }
    });
  });
}

  deleteUser() {
    const user = this.user();
    if (!user) return;
    const confirmed = confirm(`¿Seguro que quieres eliminar a ${user.first_name} ${user.last_name}?`);
    if (confirmed) {
      this.usersService.delete(user._id!).subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => alert('Error al eliminar el usuario.')
      });
    }
  }
}
