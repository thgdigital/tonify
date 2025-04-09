import type { User } from '../user/user.interface';

/**
 * Represents a Instance entity.
 */
export interface Instance {
  /** Id's id property */
  id: string;
  /** Name's name property */
  name: string;
  /** UserId's userId property */
  userId: string;
  /** Related User entity */
  user: User;
  /** InstanceId's instanceId property */
  instanceId: string  | null;
  /** Hash's hash property */
  hash: string  | null;
  /** Hash's hash property */
  status: string  | null;
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
}

/**
 * Data transfer object for creating a new Instance.
 */
export interface CreateInstanceDTO {

  /** Name's name property  */
  name: string;
  /** UserId's userId property  */
  userId: string;
  /** InstanceId's instanceId property */
  instanceId: string  | null;
  /** Hash's hash property */
  hash: string  | null;
  /** Hash's hash property */
  status: string  | null;
  /** CreatedAt's createdAt property  */
  createdAt: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt: Date;
}

/**
 * Data transfer object for updating an existing Instance.
 */
export interface UpdateInstanceDTO {
  /** Id's id property  */
  id?: string;
  /** Name's name property  */
  name?: string;
  /** UserId's userId property  */
  userId?: string;
  /** InstanceId's instanceId property */
  instanceId: string  | null;
  /** Hash's hash property */
  hash: string  | null;
  /** Hash's hash property */
  status: string  | null;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
}

/**
 * Query parameters for fetching Instance entities
 */
export interface InstanceQueryParams {
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
  /** UserId's userId property  */
  userId?: string;
  /** InstanceId's instanceId property */
  instanceId?: string  | null;
}
