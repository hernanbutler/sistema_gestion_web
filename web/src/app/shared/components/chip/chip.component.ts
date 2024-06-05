import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() status?: string;
  @Input() priority?: string;

  getClassOf(value: string) {
    switch (value) {
      case 'PENDIENTE':
        return 'status-pending';
      case 'FINALIZADO':
        return 'status-finished';
      default:
        return 'status-deleted';
    }
  }

  getIconOf(value: any) {
    switch (value) {
      case 'BAJA':
        return 'matArrowDownward';
      case 'MEDIA':
        return 'matEquals';
      default:
        return 'matArrowUpward';
    }
  }
}
