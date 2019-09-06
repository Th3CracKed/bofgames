import { Moment } from 'moment';
import { IClient } from 'app/shared/model/client.model';
import { IItem } from 'app/shared/model/item.model';

export interface ICart {
  id?: number;
  expiration?: Moment;
  client?: IClient;
  items?: IItem[];
}

export class Cart implements ICart {
  constructor(public id?: number, public expiration?: Moment, public client?: IClient, public items?: IItem[]) {}
}
