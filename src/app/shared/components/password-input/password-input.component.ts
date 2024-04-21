import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '@core/services';

@Component({
  selector: 'shared-password-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
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

  #validatorsService = inject(ValidatorsService);

  public isValidControl(): boolean | null {
    return this.#validatorsService.isValidField(this.control());
  }

  public getError(): string | null {
    return this.#validatorsService.getControlError(this.control());
  }
}
