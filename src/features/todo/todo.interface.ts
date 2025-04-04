
/**
 * Represents a Todo entity.
 */
export interface Todo {
  /** Id's id property */
  id: string;
  /** Title's title property */
  title: string;
  /** Completed's completed property */
  completed: boolean;
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
}

/**
 * Data transfer object for creating a new Todo.
 */
export interface CreateTodoDTO {
  /** Id's id property  */
  id: string;
  /** Title's title property  */
  title: string;
  /** Completed's completed property  */
  completed: boolean;
  /** CreatedAt's createdAt property  */
  createdAt: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt: Date;
}

/**
 * Data transfer object for updating an existing Todo.
 */
export interface UpdateTodoDTO {
  /** Id's id property  */
  id?: string;
  /** Title's title property  */
  title?: string;
  /** Completed's completed property  */
  completed?: boolean;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
}

/**
 * Query parameters for fetching Todo entities
 */
export interface TodoQueryParams {
  /** Current page number for pagination */
  page?: number;
  /** Number of items to return per page */
  limit?: number;
  /** Property to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  /** Search term for filtering */
  search?: string;
}
