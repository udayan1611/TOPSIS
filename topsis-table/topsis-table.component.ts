
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { InputTextModule } from 'primeng/inputtext';

// @Component({
//   selector: 'app-topsis-table',
//   standalone: true,
//   imports: [CommonModule, DropdownModule, FormsModule, TableModule, ButtonModule, InputNumberModule, InputTextModule],
//   templateUrl: './topsis-table.component.html',
//   styleUrls: ['./topsis-table.component.css']
// })
// export class TopsisTableComponent {
//   systems: any[] = [
//     { label: 'Fighter Aircraft', value: 'Fighter Aircraft' },
//     { label: 'Surface Platform', value: 'Surface Platform' },
//     { label: 'UAV', value: 'UAV' },
//     { label: 'UACV', value: 'UACV' },
//     { label: 'Main Battle Tank', value: 'Main Battle Tank' }
//   ];
//   selectedSystem: any;

//   criteriaList: any[] = [];
//   alternatives: any[] = [];
//   alternativeRanks: number[] = [];



//   addCriteria() {
//     if (this.criteriaList.length < 25) {
//       let newCriteria = { 
//         criteria: `Criteria-${this.criteriaList.length + 1}`, 
//         weight: 0,
//         minimize: false, // Initialize minimize property
//         values: new Array(this.alternatives.length).fill(0) // Initialize values for all alternatives
//       };
//       this.criteriaList.push(newCriteria);
  
//       // If this is the first criteria being added, add the first alternative automatically
//       if (this.criteriaList.length === 1) {
//         this.alternatives.push(`Alternative-1`);
//         this.criteriaList.forEach(criteria => {
//           criteria.values.push(0); // Initialize values for the first alternative
//         });
//       } else {
//         // Update values for existing alternatives
//         this.criteriaList.forEach(criteria => {
//           if (criteria.values.length < this.alternatives.length) {
//             criteria.values.push(0); // Fill the values for new alternatives
//           }
//         });
//       }
//     }
//   }
  
//   addAlternative() {
//     if (this.alternatives.length < 25) {
//       this.alternatives.push(`Alternative-${this.alternatives.length + 1}`);
  
//       // Update values for existing criteria
//       this.criteriaList.forEach(criteria => {
//         criteria.values.push(0); // Fill the values for the new alternative
//       });
//     }
//   }
 
//   calculateRank() {
//     if (!this.validateWeights()) {
//             alert('Total weight must be equal to 1');
//             return;
//           }
//     // Normalize the decision matrix
//     let normalizedMatrix = this.criteriaList.map(criteria => {
//       let norm = Math.sqrt(criteria.values.reduce((sum, value) => sum + value * value, 0));
//       return criteria.values.map(value => value / norm);
//     });

//     // Calculate the weighted normalized decision matrix
//     let weightedNormalizedMatrix = normalizedMatrix.map((row, i) => row.map(value => value * this.criteriaList[i].weight));

//     // Determine ideal and negative-ideal solutions
//     let idealSolution = weightedNormalizedMatrix.map(row => Math.max(...row));
//     let negativeIdealSolution = weightedNormalizedMatrix.map(row => Math.min(...row));

//     // Calculate the separation measures
//     let separationFromIdeal = this.alternatives.map((_, j) =>
//       Math.sqrt(weightedNormalizedMatrix.reduce((sum, row, i) => sum + Math.pow(row[j] - idealSolution[i], 2), 0))
//     );
//     let separationFromNegativeIdeal = this.alternatives.map((_, j) =>
//       Math.sqrt(weightedNormalizedMatrix.reduce((sum, row, i) => sum + Math.pow(row[j] - negativeIdealSolution[i], 2), 0))
//     );

//     // Calculate the relative closeness to the ideal solution
//     let relativeCloseness = this.alternatives.map((_, j) =>
//       separationFromNegativeIdeal[j] / (separationFromNegativeIdeal[j] + separationFromIdeal[j])
//     );

//     // Determine the rank based on the relative closeness
//     this.alternativeRanks = relativeCloseness.map((value, index) => ({ value, index }))
//       .sort((a, b) => b.value - a.value)
//       .map((item, rank) => ({ ...item, rank: rank + 1 }))
//       .sort((a, b) => a.index - b.index)
//       .map(item => item.rank);
//   }
  
//   validateWeights(): boolean {
//     let totalWeight = this.criteriaList.reduce((sum, item) => sum + item.weight, 0);
//     return totalWeight === 1;
//   }

//   saveTable() {
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.criteriaList));
//     const dlAnchorElem = document.createElement('a');
//     dlAnchorElem.setAttribute("href", dataStr);
//     dlAnchorElem.setAttribute("download", "table_data.json");
//     dlAnchorElem.click();
//   }

//   clearTable() {
//     this.criteriaList = [];
//     this.alternatives = [];
//     this.alternativeRanks = [];
//   }
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-topsis-table',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule
  ],
  templateUrl: './topsis-table.component.html',
  styleUrls: ['./topsis-table.component.css']
})
export class TopsisTableComponent {
  systems: any[] = [
    { label: 'Fighter Aircraft', value: 'Fighter Aircraft' },
    { label: 'Surface Platform', value: 'Surface Platform' },
    { label: 'UAV', value: 'UAV' },
    { label: 'UACV', value: 'UACV' },
    { label: 'Main Battle Tank', value: 'Main Battle Tank' }
  ];
  selectedSystem: any;

  criteriaList: any[] = [];
  alternatives: any[] = [];
  alternativeRanks: number[] = [];
  topsisService: any;

  constructor() { }

  addCriteria() {
    if (this.criteriaList.length < 25) {
      let newCriteria = { 
        criteria: `Criteria-${this.criteriaList.length + 1}`, 
        weight: 0,
        minimize: false,
        values: new Array(this.alternatives.length).fill(0)
      };
      this.criteriaList.push(newCriteria);

      if (this.criteriaList.length === 1) {
        this.alternatives.push(`Alternative-1`);
        this.criteriaList.forEach(criteria => {
          criteria.values.push(0);
        });
      } else {
        this.criteriaList.forEach(criteria => {
          if (criteria.values.length < this.alternatives.length) {
            criteria.values.push(0);
          }
        });
      }
    }
  }

  addAlternative() {
    if (this.alternatives.length < 25) {
      this.alternatives.push(`Alternative-${this.alternatives.length + 1}`);

      this.criteriaList.forEach(criteria => {
        criteria.values.push(0);
      });
    }
  }

  calculateRank() {
    if (!this.validateWeights()) {
      alert('Total weight must be equal to 1');
      return;
    }

    const requestData = {
      criteriaList: this.criteriaList,
      alternatives: this.alternatives
    };

    this.topsisService.calculateTopsis(requestData).subscribe(response => {
      this.alternativeRanks = response.alternativeRanks;
    });
  }

  validateWeights(): boolean {
    let totalWeight = this.criteriaList.reduce((sum, item) => sum + item.weight, 0);
    return totalWeight === 1;
  }

  saveTable() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.criteriaList));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "table_data.json");
    dlAnchorElem.click();
  }

  clearTable() {
    this.criteriaList = [];
    this.alternatives = [];
    this.alternativeRanks = [];
  }
}
