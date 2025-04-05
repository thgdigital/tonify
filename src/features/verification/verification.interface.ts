
/**
 * Represents a Verification entity.
 */
export interface Verification {
  /** Id's id property */
  id: string;
  /** Identifier's identifier property */
  identifier: string;
  /** Value's value property */
  value: string;
  /** ExpiresAt's expiresAt property */
  expiresAt: Date;
  /** CreatedAt's createdAt property */
  createdAt: Date  | null;
  /** UpdatedAt's updatedAt property */
  updatedAt: Date  | null;
}

/**
 * Data transfer object for creating a new Verification.
 */
export interface CreateVerificationDTO {
  /** Id's id property  */
  id: string;
  /** Identifier's identifier property  */
  identifier: string;
  /** Value's value property  */
  value: string;
  /** ExpiresAt's expiresAt property  */
  expiresAt: Date;
  /** CreatedAt's createdAt property  */
  createdAt: Date  | null;
  /** UpdatedAt's updatedAt property  */
  updatedAt: Date  | null;
}

/**
 * Data transfer object for updating an existing Verification.
 */
export interface UpdateVerificationDTO {
  /** Id's id property  */
  id?: string;
  /** Identifier's identifier property  */
  identifier?: string;
  /** Value's value property  */
  value?: string;
  /** ExpiresAt's expiresAt property  */
  expiresAt?: Date;
  /** CreatedAt's createdAt property  */
  createdAt?: Date  | null;
  /** UpdatedAt's updatedAt property  */
  updatedAt?: Date  | null;
}

/**
 * Query parameters for fetching Verification entities
 */
export interface VerificationQueryParams {
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
