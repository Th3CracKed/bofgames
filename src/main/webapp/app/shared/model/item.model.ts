import { IKey } from 'app/shared/model/key.model';
import { IPromo } from 'app/shared/model/promo.model';
import { ICartLine } from 'app/shared/model/cart-line.model';
import { IGame } from 'app/shared/model/game.model';
import { IPlatform } from 'app/shared/model/platform.model';

export interface IItem {
  id?: number;
  price?: number;
  isBuyable?: boolean;
  keys?: IKey[];
  promos?: IPromo[];
  cartLines?: ICartLine[];
  game?: IGame;
  platform?: IPlatform;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public price?: number,
    public isBuyable?: boolean,
    public keys?: IKey[],
    public promos?: IPromo[],
    public cartLines?: ICartLine[],
    public game?: IGame,
    public platform?: IPlatform
  ) {
    this.isBuyable = this.isBuyable || false;
  }
}
