import { Injectable, signal } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public emailPatter = signal<string>(
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  );

  public isValidField(control: FormControl) {
    return control.errors && control.touched;
  }

  public isEqualField(field1: string, field2: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }

  getControlError(control: FormControl): string | null {
    if (!control) return null;

    const errors = control.errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es obligatorio';
        case 'minlength':
          return `El campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'min':
          return `El campo debe ser mayor o igual que ${errors[key].min}`;
        case 'pattern':
          if (
            errors[key].requiredPattern ===
            '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
          )
            return 'Este campo debe ser un email valido';
          return 'Error';

        case 'notEqual':
          return 'Los campos no coinciden';
      }
    }

    return null;
  }
}
