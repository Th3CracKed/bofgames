import { IItem } from 'app/shared/model/item.model';

export interface IKey {
  id?: number;
  value?: string;
  item?: IItem;
}

export class Key implements IKey {
  constructor(public id?: number, public value?: string, public item?: IItem) {}
}
