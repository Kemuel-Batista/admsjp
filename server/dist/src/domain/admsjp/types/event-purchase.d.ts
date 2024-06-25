import { Prisma } from '@prisma/client';
export type EventPurchaseWithEvent = Prisma.EventPurchaseGetPayload<{
    include: {
        event: {
            select: {
                title: true;
                slug: true;
                initialDate: true;
                finalDate: true;
                imagePath: true;
            };
        };
    };
}>;
export type EventPurchaseWithBuyer = Prisma.EventPurchaseGetPayload<{
    include: {
        user: {
            select: {
                email: true;
                name: true;
            };
        };
    };
}>;
export type EventPurchaseWithEventTickets = Prisma.EventPurchaseGetPayload<{
    include: {
        eventTickets: true;
    };
}>;
