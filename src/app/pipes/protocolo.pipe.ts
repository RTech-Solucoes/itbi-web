import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'protocolo',
  standalone: true
})
export class ProtocoloPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const numbers = value.replace(/\D/g, '');
    if (numbers.length < 9) return value;
    return numbers.substring(0, 9).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1.$2/$3-$4');
  }
}
