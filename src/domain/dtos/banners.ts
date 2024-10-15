import { PaginationOptions } from '.';

export type ICreateBannerDTO = {
  imageUrl: string;
  webLink: string;
  appLink?: string;
  query?: Record<string, string | string[]>;
  createdBy: string;
};

export type IUpdateBannerDTO = {
  imageUrl?: string;
  webLink?: string;
  appLink?: string;
  query?: Record<string, string | string[]>;
  lastModifiedBy: string;
};

export type IFindBannerDTO = {
  id?: string | string[];
  createdAt?: { start: Date | string | number; end: Date | string | number };
  updatedAt?: { start: Date | string | number; end: Date | string | number };
  isDeleted?: boolean;
  deletedAt?: { start: Date | string | number; end: Date | string | number };
  isActive?: boolean;
  createdBy?: string | string[];
};

export type IFindBannerOptions = PaginationOptions;
