import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@ikedadev/anami-ui/dist/anami.css';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('anami-dashboard');
}
