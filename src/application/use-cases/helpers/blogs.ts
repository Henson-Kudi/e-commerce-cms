import { Prisma } from '@prisma/client';
import { IFindBlogDTO, IFindUniqueBlogDTO } from '../../../domain/dtos/blogs';
import slugify from '../../../utils/slugify';

export function setupUniqueBlogQuery(data: IFindUniqueBlogDTO) {
  const query: Prisma.BlogPostWhereUniqueInput = {
    id: data.id ?? undefined,
    slug: data.slug ?? undefined,
    title: data.title ?? undefined,
  };

  return query;
}

export function setupFindManyBlogsQuery(data: IFindBlogDTO) {
  const query: Prisma.BlogPostWhereInput = {
    isActive: data.isActive !== false,
    isDeleted: data.isDeleted === true,
  };

  if (data.id) query.id = Array.isArray(data.id) ? { in: data.id } : data.id;

  if (data.slug)
    query.slug = Array.isArray(data.slug) ? { in: data.slug } : data.slug;

  if (data.title) {
    query.slug = Array.isArray(data.title)
      ? { in: data.title.map((it) => slugify(it)) }
      : slugify(data.title);
  }

  if (data.createdAt) {
    const createdAt = data.createdAt;
    const dateQ: Record<string, Date> = {};

    if (createdAt.end && !isNaN(new Date(createdAt.end).getTime())) {
      dateQ['lte'] = new Date(createdAt.end);
    }

    if (createdAt.start && !isNaN(new Date(createdAt.start).getTime())) {
      dateQ['gte'] = new Date(createdAt.start);
    }

    if (Object.keys(dateQ).length > 0) query.createdAt = dateQ;
  }

  if (data.updatedAt) {
    const updatedAt = data.updatedAt;
    const dateQ: Record<string, Date> = {};

    if (updatedAt.end && !isNaN(new Date(updatedAt.end).getTime())) {
      dateQ['lte'] = new Date(updatedAt.end);
    }

    if (updatedAt.start && !isNaN(new Date(updatedAt.start).getTime())) {
      dateQ['gte'] = new Date(updatedAt.start);
    }

    if (Object.keys(dateQ).length > 0) query.lastUpdatedAt = dateQ;
  }

  if (data.deletedAt) {
    const deletedAt = data.deletedAt;
    const dateQ: Record<string, Date> = {};

    if (deletedAt.end && !isNaN(new Date(deletedAt.end).getTime())) {
      dateQ['lte'] = new Date(deletedAt.end);
    }

    if (deletedAt.start && !isNaN(new Date(deletedAt.start).getTime())) {
      dateQ['gte'] = new Date(deletedAt.start);
    }

    if (Object.keys(dateQ).length > 0) query.deletedAt = dateQ;
  }

  if (data.createdBy) query.createdBy = Array.isArray(data.createdBy) ? { in: data.createdBy } : data.createdBy;

  return query;
}
