export interface ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
