import { IGame } from 'app/shared/model/game.model';

export interface ITag {
  id?: number;
  name?: string;
  games?: IGame[];
}

export class Tag implements ITag {
  constructor(public id?: number, public name?: string, public games?: IGame[]) {}
}
