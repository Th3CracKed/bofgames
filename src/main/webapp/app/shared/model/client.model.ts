import { Moment } from 'moment';
import { IReview } from 'app/shared/model/review.model';
import { ICart } from 'app/shared/model/cart.model';
import { IUser } from 'app/core/user/user.model';

export interface IClient {
  id?: number;
  street?: string;
  postCode?: string;
  city?: string;
  country?: string;
  birthdate?: Moment;
  reviews?: IReview[];
  carts?: ICart[];
  user?: IUser;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public street?: string,
    public postCode?: string,
    public city?: string,
    public country?: string,
    public birthdate?: Moment,
    public reviews?: IReview[],
    public carts?: ICart[],
    public user?: IUser
  ) {}
}
