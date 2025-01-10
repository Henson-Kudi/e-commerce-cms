import { PaginationOptions } from '..';

export type ICreateBlogDTO = {
  title: string;
  content: string;
  delta?: string; //JSON string for react quil rendering
  createdBy: string;
  headerImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaTags?: string;
};

export type IUpdateBlogDTO = {
  title?: string;
  content?: string;
  delta?: string; //JSON string for react quil rendering
  headerImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaTags?: string;
  isActive?: boolean;
  lastModifiedBy: string;
};

export type IFindBlogDTO = {
  id?: string | string[];
  title?: string | string[];
  slug?: string | string[];
  createdAt?: { start: Date | string | number; end: Date | string | number };
  updatedAt?: { start: Date | string | number; end: Date | string | number };
  isDeleted?: boolean;
  deletedAt?: { start: Date | string | number; end: Date | string | number };
  isActive?: boolean;
  createdBy?: string | string[];
};

export type IFindUniqueBlogDTO = {
  id?: string;
  title?: string;
  slug?: string;
};

export type IFindBlogOptions = PaginationOptions;
