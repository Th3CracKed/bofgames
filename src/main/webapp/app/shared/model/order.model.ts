import { IClient } from 'app/shared/model/client.model';

export interface IOrder {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  postcode?: string;
  city?: string;
  country?: string;
  items?: string;
  client?: IClient;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public street?: string,
    public postcode?: string,
    public city?: string,
    public country?: string,
    public items?: string,
    public client?: IClient
  ) {}
}
