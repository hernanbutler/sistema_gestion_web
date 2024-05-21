import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private user: any;
  private users: any;
  private activities: any;
  private audits: any;

  get getUser() {
    return this.user;
  }

  set setUser(value: any) {
    this.user = value;
  }

  get getUsers() {
    return this.users;
  }

  set setUsers(value: any) {
    this.users = value;
  }

  get getActivities() {
    return this.activities;
  }

  set setActivities(value: any) {
    this.activities = value;
  }

  set setAudits(value: any) {
    this.audits = value;
  }

  get getAudits() {
    return this.audits;
  }

  get isProfileCompleted(): boolean {
    return this.user.nombres && this.user.apellidos;
  }
}
