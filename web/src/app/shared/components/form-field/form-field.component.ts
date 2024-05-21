import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() control: any;
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  ngIcon: string = 'matKey';

  onClickToggle() {
    const isTextType = this.type === 'text';
    this.type = isTextType ? 'password' : 'text';
    this.ngIcon = isTextType ? 'matKeyOff' : 'matKey';
  }
}
