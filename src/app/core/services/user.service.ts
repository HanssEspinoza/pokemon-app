import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { User } from '@core/models';
import { Auth, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #firestore = inject(Firestore);
  #auth = inject(Auth);
  #router = inject(Router);

  async addUser(newUser: User) {
    const user = this.#auth.currentUser;

    localStorage.setItem('displayName', newUser.name);

    await updateProfile(user!, {
      displayName: newUser.name,
    });

    const userRef = collection(this.#firestore, 'users');

    this.#router.navigateByUrl('/dashboard/pokemons');

    return addDoc(userRef, newUser);
  }

  getUser(): Observable<User[]> {
    const userRef = collection(this.#firestore, 'users');

    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }
}
