import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '@shared/services/data.service';

@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  constructor(private _data: DataService) {}
  transform(value: number): any {
    const users = this._data.getUsers;
    const user = users.find((item: any) => item.id === value);
    return user ? `${user.nombres} ${user.apellidos}` : '';
  }
}
