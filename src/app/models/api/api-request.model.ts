export type FilterOperator =
  | 'EQUAL'
  | 'NOT_EQUAL'
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'STARTS_WITH'
  | 'ENDS_WITH';
export type LogicOperator = 'AND' | 'OR';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface FilterGroup {
  logic: LogicOperator;
  filters: Filter[];
}

export type Filter = FilterCondition | FilterGroup;

export interface CriteriaPagination {
  page: number;
  limit: number;
}

export class SearchQuery {
  filters: Filter[] = [];
  orderBy: string = 'createdAt';
  orderType: 'asc' | 'desc' = 'desc';
  pagination: CriteriaPagination = { limit: 10, page: 1 };

  constructor(init?: Partial<SearchQuery>) {
    Object.assign(this, init);
  }

  toCriteria() {
    return {
      filters: this.filters,
      orderBy: this.orderBy,
      orderType: this.orderType,
      pagination: this.pagination,
    };
  }

  clone(changes: Partial<SearchQuery>): SearchQuery {
    const cloned = new SearchQuery({ ...this, ...changes });
    cloned.filters = [...(changes.filters || this.filters)];
    return cloned;
  }
}
