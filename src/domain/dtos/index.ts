import AppError from '../valueObjects/error';

// Define how data will be transfered
export class IReturnValue<Data> {
  constructor(success: boolean, error?: AppError, data?: Data) {
    this.success = success;
    this.error = error;
    this.data = data;
  }

  success: boolean;
  error?: AppError;
  data?: Data;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}
