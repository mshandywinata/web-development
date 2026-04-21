interface ProductModel {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  stock: number;
  createdAt: Date;
}

type ProductPublic = Omit<ProductModel, "createdAt">;
// type CreateProductDto = Omit<ProductModel, "id" | "createdAt">;
// type UpdateProductDto = Partial<Pick<ProductModel, "name" | "description" | "priceInCents" | "stock">>;

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  statusCode: number;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
}

declare function listProducts(): PaginatedResponse<ProductPublic[]>;
