import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, ToastService, ValidatorsService } from '@core/services';
import { InputComponent, PasswordInputComponent } from '@shared/components';
import { LoadingComponent } from '@shared/pages';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  #fb = inject(FormBuilder);
  #validatorsService = inject(ValidatorsService);
  #authService = inject(AuthService);
  #toastService = inject(ToastService);
  #router = inject(Router);

  public isLoading = signal<boolean>(false);

  public registerForm = signal<FormGroup>(
    this.#fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.#validatorsService.emailPatter()),
          ],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          this.#validatorsService.isEqualField('password', 'confirmPassword'),
        ],
      }
    )
  );

  onSubmit() {
    this.isLoading.set(true);

    this.#authService
      .register(this.registerForm().value)
      .then(() => {
        this.#router.navigateByUrl('/auth.login');
        this.#toastService.showToast('Cuenta creada exitosamente', 'success');
      })
      .catch((err) => this.#toastService.showToast(err.message, 'error'))
      .finally(() => this.isLoading.set(false));
  }
}
