import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type inputType = 'text' | 'email';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styles: ``,
})
export class InputComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  type = input<inputType>('text');
}
