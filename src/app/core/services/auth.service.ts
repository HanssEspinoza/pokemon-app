import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #auth = inject(Auth);

  register({ email, password }: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.#auth, email, password);
  }

  login({ email, password }: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.#auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.#auth);
  }
}
