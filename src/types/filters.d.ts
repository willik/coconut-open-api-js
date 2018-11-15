export interface Filterable<T> {
  filters?: T;
  sort?: string;
}

export interface UserFilter {
  assigned?: boolean;
  services?: number | number[] | string | string[];
  location?: number | string;
}
