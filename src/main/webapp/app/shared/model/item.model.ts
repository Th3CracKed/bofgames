import { IKey } from 'app/shared/model/key.model';
import { IPromo } from 'app/shared/model/promo.model';
import { IGame } from 'app/shared/model/game.model';
import { IPlatform } from 'app/shared/model/platform.model';
import { ICartLine } from 'app/shared/model/cart-line.model';

export interface IItem {
  id?: number;
  price?: number;
  isBuyable?: boolean;
  keys?: IKey[];
  promos?: IPromo[];
  game?: IGame;
  platform?: IPlatform;
  cartLine?: ICartLine;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public price?: number,
    public isBuyable?: boolean,
    public keys?: IKey[],
    public promos?: IPromo[],
    public game?: IGame,
    public platform?: IPlatform,
    public cartLine?: ICartLine
  ) {
    this.isBuyable = this.isBuyable || false;
  }
}
