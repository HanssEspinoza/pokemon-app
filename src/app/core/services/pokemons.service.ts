import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { PokemonResponse } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  #http = inject(HttpClient);

  getPokemons() {
    return this.#http.get<PokemonResponse>(`${environment.pokeUrl}?limit=9`);
  }
}
