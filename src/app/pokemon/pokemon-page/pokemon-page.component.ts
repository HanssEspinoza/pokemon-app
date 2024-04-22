import { Component, inject, signal } from '@angular/core';
import { PokemonsService, ToastService } from '@core/services';
import { LoadingComponent } from '@shared/pages';
import { ProfileCardComponent } from '@shared/components';
import { Pokemon } from '@core/models';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [LoadingComponent, ProfileCardComponent],
  templateUrl: './pokemon-page.component.html',
  styles: ``,
})
export class PokemonPageComponent {
  #toastService = inject(ToastService);
  #pokemonService = inject(PokemonsService);

  public pokemons = signal<Pokemon[]>([]);

  public isLoading = signal<boolean>(false);

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.isLoading.set(true);

    this.#pokemonService.getPokemons().subscribe({
      next: (resp) => {
        const pokemons: Pokemon[] = [];

        resp.results.forEach((pokemon, index) => {
          const pokemonId = index + 1;
          const pokemonName = pokemon.name;
          const imageUrl = `${environment.imageUrl}/${pokemonId}.svg`;

          const pokemonData: Pokemon = {
            code: pokemonId,
            name: pokemonName,
            img: imageUrl,
          };

          pokemons.push(pokemonData);
        });

        this.pokemons.set(pokemons);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.#toastService.showToast('Error al cargar los Pokémon.', 'error');
        this.isLoading.set(false);
      },
    });
  }
}
