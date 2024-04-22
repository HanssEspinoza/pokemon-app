import { Component, inject, signal } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageService, ToastService } from '@core/services';
import { InputComponent } from '@shared/components';
import { LoadingComponent } from '@shared/pages';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [LoadingComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './edit-page.component.html',
  styles: ``,
})
export class EditPageComponent {
  #toastService = inject(ToastService);
  #fb = inject(FormBuilder);
  #storageService = inject(StorageService);

  public editForm = signal<FormGroup>(
    this.#fb.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', Validators.required],
      document: ['', Validators.required],
    })
  );

  email = localStorage.getItem('email');
  profileImageUrl: string | null = null;
  public isLoading = signal<boolean>(false);

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
}
