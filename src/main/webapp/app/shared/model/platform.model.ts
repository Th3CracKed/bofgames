import { IItem } from 'app/shared/model/item.model';

export interface IPlatform {
  id?: number;
  name?: string;
  items?: IItem[];
}

export class Platform implements IPlatform {
  constructor(public id?: number, public name?: string, public items?: IItem[]) {}
}
