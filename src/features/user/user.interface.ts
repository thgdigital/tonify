import type { Session } from '../session/session.interface';
import type { Account } from '../account/account.interface';
import type { Instance } from '../instance/instance.interface';

/**
 * Represents a User entity.
 */
export interface User {
  /** Id's id property */
  id: string;
  /** Name's name property */
  name: string;
  /** Email's email property */
  email: string;
  /** EmailVerified's emailVerified property */
  emailVerified: boolean;
  /** Image's image property */
  image: string  | null;
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
  /** Related Session entities */
  sessions?: Session[];
  /** Related Account entities */
  accounts?: Account[];
  /** Related Instance entities */
  instances?: Instance[];
}

/**
 * Data transfer object for creating a new User.
 */
export interface CreateUserDTO {
  /** Id's id property  */
  id: string;
  /** Name's name property  */
  name: string;
  /** Email's email property  */
  email: string;
  /** EmailVerified's emailVerified property  */
  emailVerified: boolean;
  /** Image's image property  */
  image: string  | null;
  /** CreatedAt's createdAt property  */
  createdAt: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt: Date;
  /** Array of IDs for the Session relationships to be created */
  sessionsIds?: string[];
  /** Array of IDs for the Account relationships to be created */
  accountsIds?: string[];
  /** Array of IDs for the Instance relationships to be created */
  instancesIds?: string[];
}

/**
 * Data transfer object for updating an existing User.
 */
export interface UpdateUserDTO {
  /** Id's id property  */
  id?: string;
  /** Name's name property  */
  name?: string;
  /** Email's email property  */
  email?: string;
  /** EmailVerified's emailVerified property  */
  emailVerified?: boolean;
  /** Image's image property  */
  image?: string  | null;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
  /** Array of IDs for the Session relationships to be created */
  sessionsIds?: string[];
  /** Array of IDs for the Account relationships to be created */
  accountsIds?: string[];
  /** Array of IDs for the Instance relationships to be created */
  instancesIds?: string[];
}

/**
 * Query parameters for fetching User entities
 */
export interface UserQueryParams {
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
