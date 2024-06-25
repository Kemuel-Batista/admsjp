"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = require("zod");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const user_1 = require("../../../../domain/admsjp/enums/user");
const create_event_1 = require("../../../../domain/admsjp/use-cases/events/create-event");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const createEventLotSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    lot: zod_1.z.number().int().positive(),
    value: zod_1.z.number().int().positive(),
    status: zod_1.z.number().min(0).max(1),
})
    .array();
const createEventSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    initialDate: zod_1.z.string().transform((arg) => new Date(arg)),
    finalDate: zod_1.z.string().transform((arg) => new Date(arg)),
    status: zod_1.z.coerce.number().int().min(0).max(1).optional(),
    visible: zod_1.z.coerce.number().int().min(0).max(1).optional(),
    eventType: zod_1.z.coerce.number().min(0).max(20),
    departmentId: zod_1.z.coerce.number().positive().min(1),
    message: zod_1.z.string().optional(),
    lots: zod_1.z
        .string()
        .refine((str) => {
        try {
            const parsedArray = JSON.parse(str);
            createEventLotSchema.parse(parsedArray);
            return Array.isArray(parsedArray);
        }
        catch (error) {
            return false;
        }
    }, { message: 'Invalid lots array format' })
        .transform((str) => JSON.parse(str)),
    street: zod_1.z.string().optional(),
    neighborhood: zod_1.z.string().optional(),
    number: zod_1.z.string().optional(),
    complement: zod_1.z.string().optional(),
    state: zod_1.z.coerce.number().positive().min(1).optional(),
    city: zod_1.z.coerce.number().positive().min(1).optional(),
    latitude: zod_1.z.coerce
        .number()
        .refine((value) => {
        return Math.abs(value) <= 90;
    })
        .transform((arg) => new library_1.Decimal(arg))
        .optional(),
    longitude: zod_1.z.coerce
        .number()
        .refine((value) => {
        return Math.abs(value) <= 180;
    })
        .transform((arg) => new library_1.Decimal(arg))
        .optional(),
    pixKey: zod_1.z.string(),
    pixType: zod_1.z.number().int().positive(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(createEventSchema);
let CreateEventController = class CreateEventController {
    createEvent;
    constructor(createEvent) {
        this.createEvent = createEvent;
    }
    async handle(file, body, user) {
        const { title, description, initialDate, finalDate, status, visible, eventType, departmentId, message, lots, street, neighborhood, number, complement, state, city, latitude, longitude, pixKey, pixType, } = body;
        const result = await this.createEvent.execute({
            title,
            description,
            initialDate,
            finalDate,
            status,
            visible,
            eventType,
            departmentId,
            fileName: file.originalname,
            fileType: file.mimetype,
            body: file.buffer,
            message,
            lots,
            address: {
                street,
                neighborhood,
                number,
                complement,
                state,
                city,
                latitude,
                longitude,
            },
            imagePath: '',
            slug: '',
            pixKey,
            pixType,
            createdBy: user.sub.id,
        });
        if (result.isError()) {
            const error = result.value;
            switch (error.constructor) {
                case resource_not_found_error_1.ResourceNotFoundError:
                    throw new common_1.NotFoundException(error.message);
                case resource_already_exists_error_1.ResourceAlreadyExistsError:
                    throw new common_1.ConflictException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
        const event = result.value.event;
        return event;
    }
};
exports.CreateEventController = CreateEventController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR, user_1.UserProfile.EVENTS),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 1024 * 1024 * 5,
            }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' }),
        ],
    }))),
    __param(1, (0, common_1.Body)(bodyValidationPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CreateEventController.prototype, "handle", null);
exports.CreateEventController = CreateEventController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [create_event_1.CreateEventUseCase])
], CreateEventController);
//# sourceMappingURL=create-event.controller.js.map