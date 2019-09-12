import { IItem } from 'app/shared/model/item.model';
import { IReview } from 'app/shared/model/review.model';
import { IMedia } from 'app/shared/model/media.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IGame {
  id?: number;
  name?: string;
  description?: string;
  items?: IItem[];
  reviews?: IReview[];
  media?: IMedia[];
  tags?: ITag[];
}

export class Game implements IGame {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public items?: IItem[],
    public reviews?: IReview[],
    public media?: IMedia[],
    public tags?: ITag[]
  ) {}
}
