import { IItem } from 'app/shared/model/item.model';
import { ICartLine } from 'app/shared/model/cart-line.model';

export const enum KEYSTATUS {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  BUYED = 'BUYED'
}

export interface IKey {
  id?: number;
  value?: string;
  status?: KEYSTATUS;
  item?: IItem;
  cartLine?: ICartLine;
}

export class Key implements IKey {
  constructor(public id?: number, public value?: string, public status?: KEYSTATUS, public item?: IItem, public cartLine?: ICartLine) {}
}
