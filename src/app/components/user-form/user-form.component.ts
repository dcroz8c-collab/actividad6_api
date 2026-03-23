import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public userId = signal<string | null>(null);
  public isEditMode = signal(false);

userForm = this.fb.group({
  first_name: ['', [Validators.required, Validators.minLength(2)]],
  last_name:  ['', [Validators.required, Validators.minLength(2)]],
  username:   ['', [Validators.required, Validators.minLength(3)]],
  email:      ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
  image:      ['', [Validators.required, Validators.pattern('https?://.+\\.[a-zA-Z]{2,}.*')]],
});

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.userId.set(params['id']);
        this.isEditMode.set(true);
        this.usersService.getById(params['id']).subscribe((user) => {
          this.userForm.patchValue(user);
        });
      }
    });
  }

  isInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value as any;

    if (this.isEditMode() && this.userId()) {
      this.usersService.update(this.userId()!, formValue).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente.');
          this.router.navigate(['/usuario', this.userId()]);
        },
        error: () => alert('Error al actualizar el usuario.')
      });
    } else {
      this.usersService.create(formValue).subscribe({
        next: () => {
          alert('Usuario creado correctamente.');
          this.router.navigate(['/home']);
        },
        error: () => alert('Error al crear el usuario.')
      });
    }
  }
}