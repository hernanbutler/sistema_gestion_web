import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '@shared/services/data.service';

@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  constructor(private _data: DataService) {}
  transform(value: number): any {
    const users = this._data.getUsers;
    users.find((item: any) => {
      return item.id == value ? item.nombres + ' ' + item.apellidos : '';
    });
  }
}
