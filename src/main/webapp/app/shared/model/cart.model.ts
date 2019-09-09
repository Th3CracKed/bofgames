import { IClient } from 'app/shared/model/client.model';
import { ICartLine } from 'app/shared/model/cart-line.model';

export interface ICart {
  id?: number;
  expired?: boolean;
  driver?: IClient;
  cartLine?: ICartLine;
}

export class Cart implements ICart {
  constructor(public id?: number, public expired?: boolean, public driver?: IClient, public cartLine?: ICartLine) {
    this.expired = this.expired || false;
  }
}
