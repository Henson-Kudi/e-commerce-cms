import { Prisma } from '@prisma/client';
import { IFindFaqDTO } from '../../../domain/dtos/faqs';

export function setupFindManyFaqsQuery(data: IFindFaqDTO) {
    const query: Prisma.FaqWhereInput = {
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
        .question
    ) query.question = Array.isArray(data.question) ? { in: data.question } : {
        contains: data.question,
        mode: 'insensitive',
    };

    if (data.search) {
        query.OR = [
            {
                question: {
                    contains: data.search,
                    mode: 'insensitive',
                },
            },
            {
                answer: {
                    contains: data.search,
                    mode: 'insensitive',
                },
            },
        ];
    }

    return query;
}
