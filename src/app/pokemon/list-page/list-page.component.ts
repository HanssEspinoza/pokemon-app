import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '@core/models';
import { PokemonsService } from '@core/services';
import { ProfileCardComponent } from '@shared/components';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ProfileCardComponent, RouterLink],
  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent {
  name = localStorage.getItem('displayName');
  email = localStorage.getItem('email');

  selectedPokemons = signal<Pokemon[]>([]);

  #pokemonsService = inject(PokemonsService);

  ngOnInit() {
    this.#pokemonsService.getUser().subscribe({
      next: (resp) => {
        resp.forEach((pokemonRef) => {
          console.log(pokemonRef);
          if (pokemonRef.user == this.email!) {
            this.selectedPokemons.set(pokemonRef.pokemons);
          }
        });
      },
    });
  }
}
