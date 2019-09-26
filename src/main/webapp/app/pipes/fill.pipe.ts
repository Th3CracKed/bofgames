import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {
  transform(value: number) {
    if (value) {
      return new Array(Math.floor(value)).fill(1);
    } else {
      return [];
    }
  }
}
