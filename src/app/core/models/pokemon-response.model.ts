import { Pokemon } from './pokemon.model';

export interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  user: string;
  pokemons: Pokemon[];
}
