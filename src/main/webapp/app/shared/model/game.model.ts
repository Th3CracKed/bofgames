import { IMedia } from 'app/shared/model/media.model';
import { IReview } from 'app/shared/model/review.model';
import { IItem } from 'app/shared/model/item.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IGame {
  id?: number;
  name?: string;
  description?: string;
  media?: IMedia[];
  reviews?: IReview[];
  items?: IItem[];
  tags?: ITag[];
}

export class Game implements IGame {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public media?: IMedia[],
    public reviews?: IReview[],
    public items?: IItem[],
    public tags?: ITag[]
  ) {}
}
