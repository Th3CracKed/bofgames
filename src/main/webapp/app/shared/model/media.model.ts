import { IGame } from 'app/shared/model/game.model';

export const enum MEDIATYPE {
  THUMBNAIL = 'THUMBNAIL',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export interface IMedia {
  id?: number;
  url?: string;
  type?: MEDIATYPE;
  alt?: string;
  game?: IGame;
}

export class Media implements IMedia {
  constructor(public id?: number, public url?: string, public type?: MEDIATYPE, public alt?: string, public game?: IGame) {}
}
