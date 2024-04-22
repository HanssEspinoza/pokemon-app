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

  selectedPokemons: Pokemon[] = [];

  togglePokemonSelection(pokemon: Pokemon) {
    const index = this.selectedPokemons.findIndex(
      (p) => p.code === pokemon.code
    );

    if (index !== -1) {
      this.selectedPokemons.splice(index, 1); // Elimina el Pokémon si ya está seleccionado
    } else {
      if (this.selectedPokemons.length < 3) {
        this.selectedPokemons.push(pokemon); // Agrega el Pokémon si hay menos de 3 seleccionados
      }
    }
  }

  isPokemonSelected(pokemon: Pokemon): boolean {
    return this.selectedPokemons.some((p) => p.code === pokemon.code);
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

  savePokemons() {
    this.isLoading.set(true);
    this.#pokemonService
      .addPokemons(this.selectedPokemons)
      .then(() => {
        this.#toastService.showToast('Pokemons Guardados con éxito', 'success');
      })
      .catch((err) => {
        this.#toastService.showToast('Error al cargar los Pokémon.', 'error');
      })
      .finally(() => this.isLoading.set(false));
  }
}
