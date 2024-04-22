import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '@core/services';

@Component({
  selector: 'shared-calendar-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './calendar-input.component.html',
  styles: ``,
})
export class CalendarInputComponent {
  label = input.required<string>();
  control = input.required<FormControl>();

  #validatorsService = inject(ValidatorsService);

  public isValidControl(): boolean | null {
    return this.#validatorsService.isValidField(this.control());
  }

  public getError(): string | null {
    return this.#validatorsService.getControlError(this.control());
  }
}
