import { IKey } from 'app/shared/model/key.model';
import { IPromo } from 'app/shared/model/promo.model';
import { ICartLine } from 'app/shared/model/cart-line.model';
import { IGame } from 'app/shared/model/game.model';
import { IPlatform } from 'app/shared/model/platform.model';

export interface IItem {
  id?: number;
  isBuyable?: boolean;
  price?: number;
  keys?: IKey[];
  promos?: IPromo[];
  cartLine?: ICartLine;
  game?: IGame;
  platform?: IPlatform;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public isBuyable?: boolean,
    public price?: number,
    public keys?: IKey[],
    public promos?: IPromo[],
    public cartLine?: ICartLine,
    public game?: IGame,
    public platform?: IPlatform
  ) {
    this.isBuyable = this.isBuyable || false;
  }
}
