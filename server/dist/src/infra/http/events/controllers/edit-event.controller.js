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
exports.EditEventController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const zod_1 = require("zod");
const user_1 = require("../../../../domain/admsjp/enums/user");
const edit_event_1 = require("../../../../domain/admsjp/use-cases/events/edit-event");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const editEventSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    initialDate: zod_1.z
        .string()
        .optional()
        .transform((arg) => new Date(arg)),
    finalDate: zod_1.z
        .string()
        .optional()
        .transform((arg) => new Date(arg)),
    status: zod_1.z.coerce.number().int().min(0).max(1).optional(),
    visible: zod_1.z.coerce.number().int().min(0).max(1).optional(),
    eventType: zod_1.z.coerce.number().min(0).max(20).optional(),
    message: zod_1.z.string().optional(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(editEventSchema);
const EditEventParamsSchema = zod_1.z.coerce.number().int().positive();
const paramValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(EditEventParamsSchema);
let EditEventController = class EditEventController {
    editEvent;
    constructor(editEvent) {
        this.editEvent = editEvent;
    }
    async handle(file, body, eventId, user) {
        const { title, description, initialDate, finalDate, status, visible, eventType, message, } = body;
        await this.editEvent.execute({
            id: eventId,
            title,
            description,
            initialDate,
            finalDate,
            status,
            visible,
            eventType,
            fileName: file === undefined ? undefined : file.originalname,
            fileType: file === undefined ? undefined : file.mimetype,
            body: file === undefined ? undefined : file.buffer,
            message,
            updatedBy: user.sub.id,
        });
    }
};
exports.EditEventController = EditEventController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR, user_1.UserProfile.EVENTS),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 1024 * 1024 * 5,
            }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' }),
        ],
        fileIsRequired: false,
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(1, (0, common_1.Body)(bodyValidationPipe)),
    __param(2, (0, common_1.Param)('eventId', paramValidationPipe)),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], EditEventController.prototype, "handle", null);
exports.EditEventController = EditEventController = __decorate([
    (0, common_1.Controller)('/:eventId'),
    __metadata("design:paramtypes", [edit_event_1.EditEventUseCase])
], EditEventController);
//# sourceMappingURL=edit-event.controller.js.map