import { Component } from '@angular/core';

export interface PeriodicElement {
  nombres: string;
  id: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, nombres: 'Hernan', weight: 1.0079, symbol: 'H'},
  {id: 2, nombres: 'Cristian', weight: 4.0026, symbol: 'He'},
  {id: 3, nombres: 'Nicolás', weight: 6.941, symbol: 'Li'},
  {id: 4, nombres: 'Luis', weight: 9.0122, symbol: 'Be'},
  
];

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  displayedColumns: string[] = ['id', 'nombres', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

