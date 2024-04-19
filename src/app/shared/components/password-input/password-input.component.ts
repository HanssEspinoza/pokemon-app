import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-password-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styles: ``,
})
export class PasswordInputComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  show = signal<boolean>(false);

  changeShow() {
    this.show.set(!this.show());
  }
}
