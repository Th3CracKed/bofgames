import { IGame } from 'app/shared/model/game.model';

export interface IMedia {
  id?: number;
  url?: string;
  alt?: string;
  game?: IGame;
}

export class Media implements IMedia {
  constructor(public id?: number, public url?: string, public alt?: string, public game?: IGame) {}
}
