import { IKey } from 'app/shared/model/key.model';
import { IItem } from 'app/shared/model/item.model';
import { ICart } from 'app/shared/model/cart.model';

export interface ICartLine {
  id?: number;
  quantity?: number;
  unitPrice?: number;
  expired?: boolean;
  keys?: IKey[];
  items?: IItem[];
  cart?: ICart;
}

export class CartLine implements ICartLine {
  constructor(
    public id?: number,
    public quantity?: number,
    public unitPrice?: number,
    public expired?: boolean,
    public keys?: IKey[],
    public items?: IItem[],
    public cart?: ICart
  ) {
    this.expired = this.expired || false;
  }
}
