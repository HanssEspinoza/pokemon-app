import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Pokemon, PokemonResponse } from '@core/models';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  #http = inject(HttpClient);
  #firestore = inject(Firestore);
  #router = inject(Router);

  getPokemons() {
    return this.#http.get<PokemonResponse>(`${environment.pokeUrl}?limit=9`);
  }

  addPokemons(pokemons: Pokemon[]) {
    const email = localStorage.getItem('email');
    const pokemonData = { ...pokemons, user: email };
    const userRef = collection(this.#firestore, 'pokemons');

    this.#router.navigateByUrl('/dashboard/list');

    return addDoc(userRef, pokemonData);
  }
}
