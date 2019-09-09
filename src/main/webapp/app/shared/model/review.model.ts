import { IGame } from 'app/shared/model/game.model';
import { IClient } from 'app/shared/model/client.model';

export interface IReview {
  id?: number;
  mark?: number;
  comment?: string;
  game?: IGame;
  client?: IClient;
}

export class Review implements IReview {
  constructor(public id?: number, public mark?: number, public comment?: string, public game?: IGame, public client?: IClient) {}
}
