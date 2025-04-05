import type { User } from '../user/user.interface';

/**
 * Represents a Account entity.
 */
export interface Account {
  /** Id's id property */
  id: string;
  /** AccountId's accountId property */
  accountId: string;
  /** ProviderId's providerId property */
  providerId: string;
  /** UserId's userId property */
  userId: string;
  /** Related User entity */
  user: User;
  /** AccessToken's accessToken property */
  accessToken: string  | null;
  /** RefreshToken's refreshToken property */
  refreshToken: string  | null;
  /** IdToken's idToken property */
  idToken: string  | null;
  /** AccessTokenExpiresAt's accessTokenExpiresAt property */
  accessTokenExpiresAt: Date  | null;
  /** RefreshTokenExpiresAt's refreshTokenExpiresAt property */
  refreshTokenExpiresAt: Date  | null;
  /** Scope's scope property */
  scope: string  | null;
  /** Password's password property */
  password: string  | null;
  /** CreatedAt's createdAt property */
  createdAt: Date;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date;
}

/**
 * Data transfer object for creating a new Account.
 */
export interface CreateAccountDTO {
  /** Id's id property  */
  id: string;
  /** ProviderId's providerId property  */
  providerId: string;
  /** UserId's userId property  */
  userId: string;
  /** AccessToken's accessToken property  */
  accessToken: string  | null;
  /** RefreshToken's refreshToken property  */
  refreshToken: string  | null;
  /** IdToken's idToken property  */
  idToken: string  | null;
  /** AccessTokenExpiresAt's accessTokenExpiresAt property  */
  accessTokenExpiresAt: Date  | null;
  /** RefreshTokenExpiresAt's refreshTokenExpiresAt property  */
  refreshTokenExpiresAt: Date  | null;
  /** Scope's scope property  */
  scope: string  | null;
  /** Password's password property  */
  password: string  | null;
  /** CreatedAt's createdAt property  */
  createdAt: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt: Date;
}

/**
 * Data transfer object for updating an existing Account.
 */
export interface UpdateAccountDTO {
  /** Id's id property  */
  id?: string;
  /** ProviderId's providerId property  */
  providerId?: string;
  /** UserId's userId property  */
  userId?: string;
  /** AccessToken's accessToken property  */
  accessToken?: string  | null;
  /** RefreshToken's refreshToken property  */
  refreshToken?: string  | null;
  /** IdToken's idToken property  */
  idToken?: string  | null;
  /** AccessTokenExpiresAt's accessTokenExpiresAt property  */
  accessTokenExpiresAt?: Date  | null;
  /** RefreshTokenExpiresAt's refreshTokenExpiresAt property  */
  refreshTokenExpiresAt?: Date  | null;
  /** Scope's scope property  */
  scope?: string  | null;
  /** Password's password property  */
  password?: string  | null;
  /** CreatedAt's createdAt property  */
  createdAt?: Date;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date;
}

/**
 * Query parameters for fetching Account entities
 */
export interface AccountQueryParams {
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
