import { PaginationOptions } from '.';

export type ICreateFaqDTO = {
  question: string;
  answer: string;
  createdBy: string;
};

export type IUpdateFaqDTO = {
  question: string;
  answer: string;
  lastModifiedBy: string;
};

export type IFindFaqDTO = {
  id?: string | string[];
  createdAt?: { start: Date | string | number; end: Date | string | number };
  updatedAt?: { start: Date | string | number; end: Date | string | number };
  isDeleted?: boolean;
  deletedAt?: { start: Date | string | number; end: Date | string | number };
  isActive?: boolean;
  createdBy?: string | string[];
  question?: string | string[];
  search?: string;
};

export type IFindFaqOptions = PaginationOptions;
