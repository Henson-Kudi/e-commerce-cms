import { PaginationOptions } from '.';

export type ICreateTermsAndConditionsDTO = {
    title: string;
    content: string;
    createdBy: string;
    metaTitle?: string
    metaDescription?: string
    metaTags?: string
};

export type IUpdateTermsAndConditionsDTO = {
    title?: string;
    content?: string;
    metaTitle?: string
    metaDescription?: string
    metaTags?: string
    lastModifiedBy: string;
};

export type IFindTermsAndConditionsDTO = {
    id?: string | string[];
    createdAt?: { start: Date | string | number; end: Date | string | number };
    updatedAt?: { start: Date | string | number; end: Date | string | number };
    isDeleted?: boolean;
    deletedAt?: { start: Date | string | number; end: Date | string | number };
    isActive?: boolean;
    createdBy?: string | string[];
    title?: string | string[];
    slug?: string | string[];
    search?: string
};

export type IFindTermsAndConditionsOptions = PaginationOptions;
