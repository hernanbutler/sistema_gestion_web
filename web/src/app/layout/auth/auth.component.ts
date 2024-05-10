import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
  }
}
