import { Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page';

export const pokemonRoutes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('@pokemon/list-page').then((m) => m.ListPageComponent),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('@pokemon/edit-page').then((m) => m.EditPageComponent),
      },
      {
        path: 'pokemons',
        loadComponent: () =>
          import('@pokemon/pokemon-page').then((m) => m.PokemonPageComponent),
      },

      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
