import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['/auth/login']);
  }
}
