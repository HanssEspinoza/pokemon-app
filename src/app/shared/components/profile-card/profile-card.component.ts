import { Component, inject, signal } from '@angular/core';
import { StorageService, UserService } from '@core/services';
import { getDownloadURL } from '@angular/fire/storage';
import { LoadingComponent } from '@shared/pages';
import { User } from '@core/models';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './profile-card.component.html',
  styles: ``,
})
export class ProfileCardComponent {
  email = localStorage.getItem('email');
  name = localStorage.getItem('displayName');

  #storageService = inject(StorageService);
  #userService = inject(UserService);

  profileImageUrl: string | null = null;
  public isLoading = signal<boolean>(false);
  public user = signal<User | undefined>(undefined);
  public age = signal(0);

  ngOnInit() {
    this.getProfileImage();
    this.#userService.getUser().subscribe({
      next: (resp) => {
        resp.forEach((userRef) => {
          if (userRef.name.includes(this.name!)) {
            this.user.set(userRef);
          }
        });
      },
    });
    this.age.set(this.calculateAge(this.user()!.birthday ?? 0));
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

  private calculateAge(birthday: Date): number {
    const today = new Date();
    const diff = today.getTime() - birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
