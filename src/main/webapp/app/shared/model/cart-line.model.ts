import { IItem } from 'app/shared/model/item.model';
import { ICart } from 'app/shared/model/cart.model';
import { IKey } from 'app/shared/model/key.model';

export interface ICartLine {
  id?: number;
  quantity?: number;
  unitPrice?: number;
  expired?: boolean;
  item?: IItem;
  cart?: ICart;
  keys?: IKey[];
}

export class CartLine implements ICartLine {
  constructor(
    public id?: number,
    public quantity?: number,
    public unitPrice?: number,
    public expired?: boolean,
    public item?: IItem,
    public cart?: ICart,
    public keys?: IKey[]
  ) {
    this.expired = this.expired || false;
  }
}
