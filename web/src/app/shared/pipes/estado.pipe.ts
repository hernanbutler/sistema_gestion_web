import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado',
})
export class EstadoPipe implements PipeTransform {
  transform(value: number): string {
    return value ? 'Activo' : 'Inactivo';
  }
}
