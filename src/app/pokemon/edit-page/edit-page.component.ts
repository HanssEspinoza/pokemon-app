import { Component, inject, signal } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageService, ToastService, UserService } from '@core/services';
import { CalendarInputComponent, InputComponent } from '@shared/components';
import { LoadingComponent } from '@shared/pages';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    LoadingComponent,
    InputComponent,
    ReactiveFormsModule,
    CalendarInputComponent,
  ],
  templateUrl: './edit-page.component.html',
  styles: ``,
})
export class EditPageComponent {
  #toastService = inject(ToastService);
  #fb = inject(FormBuilder);
  #storageService = inject(StorageService);
  #userService = inject(UserService);

  public editForm = signal<FormGroup>(
    this.#fb.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', Validators.required],
      document: ['', Validators.required],
    })
  );

  get birthdayDate() {
    return this.editForm().get('birthday');
  }

  email = localStorage.getItem('email');
  profileImageUrl: string | null = null;
  public isLoading = signal<boolean>(false);
  public age: number | null = null;

  ngOnInit() {
    this.getProfileImage();
  }

  uploadImage($event: any) {
    this.isLoading.set(true);
    const file = $event.target.files[0];

    this.#storageService
      .upload(file, this.email!)
      .then(() =>
        this.#toastService.showToast(
          'Imagen de Perfil cargada correctamente',
          'success'
        )
      )
      .catch((err) => this.#toastService.showToast(err, 'error'))
      .finally(() => {
        this.getProfileImage();
        this.isLoading.set(false);
      });
  }

  getProfileImage() {
    this.isLoading.set(true);

    this.#storageService
      .getOne()
      .then((result) => {
        result.items.forEach((itemRef) => {
          if (itemRef.name.includes(this.email!)) {
            getDownloadURL(itemRef)
              .then((url) => {
                this.profileImageUrl = url;
                console.log(this.profileImageUrl);
              })
              .catch((error) => {
                console.error('Error al obtener la URL de descarga:', error);
              });
          }
        });
      })
      .catch((error) => {
        console.error('Error al listar imágenes:', error);
      })
      .finally(() => this.isLoading.set(false));
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.target.value);
    this.age = this.calculateAge(selectedDate);
    console.log(this.age);
  }

  async onSubmit() {
    if (this.editForm().invalid) {
      this.editForm().markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const documentValue = this.editForm().get('document')?.value;

    if (this.age && this.age >= 18) {
      const documentRegex = /^\d{8}-\d$/;
      if (!documentRegex.test(documentValue)) {
        this.#toastService.showToast(
          'Documento de identidad debe tener el siguiente enmascarado (05265519-8)',
          'error'
        );
        return;
      }
    }

    this.#userService
      .addUser(this.editForm().value)
      .then(() =>
        this.#toastService.showToast('Datos cargados correctamente', 'success')
      )
      .catch((err) => this.#toastService.showToast(err, 'error'))
      .finally(() => this.isLoading.set(false));
  }

  private calculateAge(birthday: Date): number {
    const today = new Date();
    const diff = today.getTime() - birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
