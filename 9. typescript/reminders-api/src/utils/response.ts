import { Response } from "express";
import { ApiResponseDto } from "../schemas/response.schema";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200,
) => {
  const response: ApiResponseDto<T> = {
    success: true,
    message,
    data,
  };

  return res.status(status).json(response);
};

export const sendError = <T>(
  res: Response,
  message: string | undefined = "Internal server error",
  status = 500,
  errors: any = null,
) => {
  const response: ApiResponseDto<T> = {
    success: false,
    message,
    errors,
  };

  return res.status(status).json(response);
};
