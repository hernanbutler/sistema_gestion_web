import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() name: string;
  @Input() control: FormControl = new FormControl();
  @Input() options: any[] = [];
  @Output() value: EventEmitter<any> = new EventEmitter<any>();

  onChange(event: any): void {
    this.value.emit(event ?? { ID: '', name: '' });
  }
}
