/// <reference types="node" />
import { Event } from '@prisma/client';
import { Either } from '@/core/either';
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error';
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
import { Uploader } from '@/domain/admsjp/storage/uploader';
import { CreateEventAddressUseCase, CreateEventAddressUseCaseRequest } from '../event-address/create-event-address';
import { CreateEventLotUseCase, CreateEventLotUseCaseRequest } from '../event-lot/create-event-lot';
interface CreateEventUseCaseRequest {
    title: Event['title'];
    slug: Event['slug'];
    description: Event['description'];
    initialDate: Event['initialDate'];
    finalDate: Event['finalDate'];
    status: Event['status'];
    visible: Event['visible'];
    departmentId: Event['departmentId'];
    eventType: Event['eventType'];
    imagePath: Event['imagePath'];
    message?: Event['message'];
    lots?: CreateEventLotUseCaseRequest[];
    address?: CreateEventAddressUseCaseRequest;
    createdBy: Event['createdBy'];
    fileName: string;
    fileType: string;
    pixKey: string;
    pixType: number;
    body: Buffer;
}
type CreateEventUseCaseResponse = Either<InvalidAttachmentTypeError | ResourceAlreadyExistsError, {
    event: Event;
}>;
export declare class CreateEventUseCase {
    private eventsRepository;
    private createEventLotUseCase;
    private createEventAddressUseCase;
    private uploader;
    constructor(eventsRepository: EventsRepository, createEventLotUseCase: CreateEventLotUseCase, createEventAddressUseCase: CreateEventAddressUseCase, uploader: Uploader);
    execute({ title, description, initialDate, finalDate, status, visible, eventType, departmentId, fileName, fileType, body, lots, address, message, pixKey, pixType, createdBy, }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse>;
}
export {};
