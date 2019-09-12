import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {
  transform(value: number) {
    return new Array(Math.floor(value)).fill(1);
  }
}
