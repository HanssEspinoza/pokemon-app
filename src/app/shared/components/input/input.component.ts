import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '@core/services';

type inputType = 'text' | 'email';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styles: ``,
})
export class InputComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  type = input<inputType>('text');

  #validatorsService = inject(ValidatorsService);

  public isValidControl(): boolean | null {
    return this.#validatorsService.isValidField(this.control());
  }

  public getError(): string | null {
    return this.#validatorsService.getControlError(this.control());
  }
}
