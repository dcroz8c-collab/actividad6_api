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

  public user = signal<IUser | null>(null);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.usersService.getById(params['id']).subscribe((response) => {
        this.user.set(response);
      });
    });
  }

  deleteUser() {
    const u = this.user();
    if (!u) return;
    const confirmed = confirm(`¿Seguro que quieres eliminar a ${u.first_name} ${u.last_name}?`);
    if (confirmed) {
      this.usersService.delete(u._id!).subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => alert('Error al eliminar el usuario.')
      });
    }
  }
}
