import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputComponent, PasswordInputComponent } from '@shared/components';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, InputComponent, PasswordInputComponent],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  #fb = inject(FormBuilder);

  public loginForm = signal<FormGroup>(
    this.#fb.group({ email: [''], password: [''] })
  );
}
