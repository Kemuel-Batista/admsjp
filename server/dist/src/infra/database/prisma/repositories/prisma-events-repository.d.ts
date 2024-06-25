import { Event, Prisma } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListEventDTO } from '@/domain/admsjp/dtos/event';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class PrismaEventsRepository implements EventsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ title, slug, description, initialDate, finalDate, status, visible, departmentId, eventType, imagePath, message, pixKey, pixType, createdBy, }: Prisma.EventUncheckedCreateInput): Promise<Event>;
    update({ id, title, slug, description, initialDate, finalDate, status, visible, eventType, imagePath, message, pixKey, pixType, updatedBy, }: Event): Promise<Event>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListEventDTO>;
    findById(id: Event['id']): Promise<Event | null>;
    findByTitle(title: Event['title']): Promise<Event | null>;
    findBySlug(slug: Event['slug']): Promise<Event | null>;
    delete(id: Event['id']): Promise<void>;
}
