import { HttpParams } from '@angular/common/http';

export class PaginateApiRequest {
  limit: number = 10;
  page: number = 1;
}

export class SearchQuery<T> extends PaginateApiRequest {
  body?: T;
  constructor(init?: Partial<SearchQuery<T>>) {
    super();
    Object.assign(this, init);
  }

  getParams() {
    return new HttpParams().set('page', this.page.toString()).set('limit', this.limit.toString());
  }

  clone(changes: Partial<SearchQuery<T>>): SearchQuery<T> {
    return new SearchQuery({ ...this, ...changes });
  }
}
