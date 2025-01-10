import { PaginationOptions } from '.';

export type ICreatePolicyDTO = {
  title: string;
  content: string;
  delta?: string;
  createdBy: string;
  metaTitle?: string;
  metaDescription?: string;
  metaTags?: string;
};

export type IUpdatePolicyDTO = {
  title?: string;
  content?: string;
  delta?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaTags?: string;
  lastModifiedBy: string;
};

export type IFindPolicyDTO = {
  id?: string | string[];
  createdAt?: { start: Date | string | number; end: Date | string | number };
  updatedAt?: { start: Date | string | number; end: Date | string | number };
  isDeleted?: boolean;
  deletedAt?: { start: Date | string | number; end: Date | string | number };
  isActive?: boolean;
  createdBy?: string | string[];
  title?: string | string[];
  slug?: string | string[];
  search?: string;
};

export type IFindPrivacyOptions = PaginationOptions;
