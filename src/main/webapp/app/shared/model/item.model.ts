import { IKey } from 'app/shared/model/key.model';
import { IPromo } from 'app/shared/model/promo.model';
import { ICart } from 'app/shared/model/cart.model';
import { IGame } from 'app/shared/model/game.model';
import { IPlatform } from 'app/shared/model/platform.model';

export interface IItem {
  id?: number;
  price?: number;
  keys?: IKey[];
  promos?: IPromo[];
  carts?: ICart[];
  game?: IGame;
  platform?: IPlatform;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public price?: number,
    public keys?: IKey[],
    public promos?: IPromo[],
    public carts?: ICart[],
    public game?: IGame,
    public platform?: IPlatform
  ) {}
}
