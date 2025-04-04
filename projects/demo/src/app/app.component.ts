import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DmsSearchComponent } from 'dms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DmsSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'demo';
}
