import { Moment } from 'moment';
import { ICart } from 'app/shared/model/cart.model';
import { IReview } from 'app/shared/model/review.model';

export interface IClient {
  id?: number;
  street?: string;
  postCode?: string;
  city?: string;
  country?: string;
  birthdate?: Moment;
  cart?: ICart;
  reviews?: IReview[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public street?: string,
    public postCode?: string,
    public city?: string,
    public country?: string,
    public birthdate?: Moment,
    public cart?: ICart,
    public reviews?: IReview[]
  ) {}
}
