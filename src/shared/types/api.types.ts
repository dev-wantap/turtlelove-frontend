// API Response 형식
export interface ApiResult<T> {
  data: T;
}

export interface ApiError {
  code: string;
  message: string;
  status?: number;
}

// API Response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// Pagination
export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

// Token
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
