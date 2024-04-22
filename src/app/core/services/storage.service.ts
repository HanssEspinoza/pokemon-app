import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  #storage = inject(Storage);

  upload(file: any, email: string) {
    const imgRef = ref(this.#storage, `profile/${email}`);

    return uploadBytes(imgRef, file);
  }

  getOne() {
    const imageRef = ref(this.#storage, 'profile');

    return listAll(imageRef);
  }
}
