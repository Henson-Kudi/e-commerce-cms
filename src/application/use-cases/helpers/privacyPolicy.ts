import { Prisma } from '@prisma/client';
import { IFindPolicyDTO } from '../../../domain/dtos/privacyPolicy';
import slugify from '../../../utils/slugify';

export function setupFindManyPoliciesQuery(data: IFindPolicyDTO) {
    const query: Prisma.PrivacyPolicyWhereInput = {
        isActive: data.isActive !== false,
        isDeleted: data.isDeleted === true,
    };

    if (data.id) query.id = Array.isArray(data.id) ? { in: data.id } : data.id;

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

    if (data
        .title
    ) query.slug = Array.isArray(data.title) ? { in: data.title.map(item => slugify(item)) } : slugify(data.title)

    if (data.slug && !data.title) {
        query.slug = Array.isArray(data.slug) ? { in: data.slug } : data.slug;
    }

    if (data.search) {
        query.OR = [
            {
                title: {
                    contains: data.search,
                    mode: 'insensitive',
                },
            },
            {
                content: {
                    contains: data.search,
                    mode: 'insensitive',
                },
            },
        ];
    }

    return query;
}
