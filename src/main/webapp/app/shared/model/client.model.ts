import { Moment } from 'moment';
import { ICart } from 'app/shared/model/cart.model';
import { IReview } from 'app/shared/model/review.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IClient {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  postCode?: string;
  city?: string;
  country?: string;
  birthday?: Moment;
  cart?: ICart;
  reviews?: IReview[];
  orders?: IOrder[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public street?: string,
    public postCode?: string,
    public city?: string,
    public country?: string,
    public birthday?: Moment,
    public cart?: ICart,
    public reviews?: IReview[],
    public orders?: IOrder[]
  ) {}
}
