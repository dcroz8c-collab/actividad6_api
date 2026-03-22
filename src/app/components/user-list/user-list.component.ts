import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  private usersService = inject(UsersService);
  public usersList = signal<IUser[]>([]);

  ngOnInit() {
    this.usersService.getAll().subscribe((response) => {
      this.usersList.set(response.results);
    });
  }

  deleteUser(user: IUser) {
    const confirmed = confirm(`¿Seguro que quieres eliminar a ${user.first_name} ${user.last_name}?`);
    if (confirmed) {
      this.usersService.delete(user._id!).subscribe({
        next: () => this.usersList.update(list => list.filter(u => u._id !== user._id)),
        error: () => alert('Error al eliminar el usuario.')
      });
    }
  }
}