import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';

export interface IPromo {
  id?: number;
  sale?: number;
  start?: Moment;
  end?: Moment;
  item?: IItem;
}

export class Promo implements IPromo {
  constructor(public id?: number, public sale?: number, public start?: Moment, public end?: Moment, public item?: IItem) {}
}
