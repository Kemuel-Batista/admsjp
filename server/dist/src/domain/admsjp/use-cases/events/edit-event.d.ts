/// <reference types="node" />
import { Event } from '@prisma/client';
import { Either } from '@/core/either';
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error';
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
import { Uploader } from '@/domain/admsjp/storage/uploader';
import { MailNotifier } from '../../notifiers/mail-notifier';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
interface EditEventUseCaseRequest {
    id: Event['id'];
    title?: Event['title'];
    description?: Event['description'];
    initialDate?: Event['initialDate'];
    finalDate?: Event['finalDate'];
    status?: Event['status'];
    visible?: Event['visible'];
    eventType?: Event['eventType'];
    message?: Event['message'];
    fileName?: string;
    fileType?: string;
    body?: Buffer;
    updatedBy: Event['updatedBy'];
}
type EditEventUseCaseResponse = Either<ResourceNotFoundError | ResourceAlreadyExistsError | InvalidAttachmentTypeError, {
    event: Event;
}>;
export declare class EditEventUseCase {
    private eventsRepository;
    private eventPurchasesRepository;
    private uploader;
    private mailNotifier;
    constructor(eventsRepository: EventsRepository, eventPurchasesRepository: EventPurchasesRepository, uploader: Uploader, mailNotifier: MailNotifier);
    execute({ id, title, description, initialDate, finalDate, status, visible, eventType, fileName, fileType, body, message, updatedBy, }: EditEventUseCaseRequest): Promise<EditEventUseCaseResponse>;
}
export {};
