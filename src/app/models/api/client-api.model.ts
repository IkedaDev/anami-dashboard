import { PaginateApiRequest } from './api-request.model';

export interface ClientFindByRequest {
  params: PaginateApiRequest;
  body?: {
    id?: string;
    name?: string;
    email?: string;
    rut?: string;
  };
}
