import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, ValidatorsService } from '@core/services';
import { InputComponent, PasswordInputComponent } from '@shared/components';
import { LoadingComponent } from '@shared/pages';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    PasswordInputComponent,
    LoadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  #fb = inject(FormBuilder);
  #validatorsService = inject(ValidatorsService);
  #authService = inject(AuthService);

  public isLoading = signal<boolean>(false);

  public loginForm = signal<FormGroup>(
    this.#fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.#validatorsService.emailPatter()),
        ],
      ],
      password: ['', [Validators.required]],
    })
  );

  onSubmit() {
    if (this.loginForm().invalid) {
      this.loginForm().markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.#authService
      .login(this.loginForm().value)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err))
      .finally(() => this.isLoading.set(false));
  }
}
