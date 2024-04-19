import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@shared/components';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {}
