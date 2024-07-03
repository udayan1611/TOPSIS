import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopsisTableComponent } from "./topsis-table/topsis-table.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TopsisTableComponent]
})
export class AppComponent {
  title = 'topsis-app';
}
