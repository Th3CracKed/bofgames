import { Games } from './games';
import { Plateform } from './plateform';

export class Item {
  id: number;
  price: number;
  isBuyable: boolean;
  // keys
  // promos
  game: Games;
  platform: Plateform;
}
