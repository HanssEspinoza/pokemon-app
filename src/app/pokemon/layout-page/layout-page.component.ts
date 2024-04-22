import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services';
import { ToolbarComponent } from '@shared/components';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [ToolbarComponent, RouterOutlet],
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  isMenuOpen = false;

  #authService = inject(AuthService);
  #router = inject(Router);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.#authService
      .logout()
      .then(() => {
        localStorage.removeItem('displayName');
        localStorage.removeItem('email');
        this.#router.navigateByUrl('/auth/login');
      })
      .catch((err) => console.log(err));
  }
}
