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
  constructor(private topsisService: TopsisService) { }

  calculate() {
    const requestBody = {
      alternatives: ['Alternative1', 'Alternative2', 'Alternative3'],
      criteria: ['Criteria1', 'Criteria2', 'Criteria3'],
      criteriaValues: [
          [1.0, 2.0, 3.0],
          [4.0, 5.0, 6.0],
          [7.0, 8.0, 9.0]
      ],
      weights: [0.5, 0.3, 0.2],
      benefitCriteria: [true, false, true]
    };

    this.topsisService.calculateTopsis(requestBody).subscribe(response => {
      console.log(response);
    });
  }
}

