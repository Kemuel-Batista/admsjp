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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProfilePermissionsRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaProfilePermissionsRepository = class PrismaProfilePermissionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ profileId, key, createdBy, }) {
        const profilePermission = await this.prisma.profilePermission.create({
            data: { profileId, key, createdBy, updatedBy: createdBy },
        });
        return profilePermission;
    }
    async list(options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const profilePermissions = await this.prisma.profilePermission.findMany({
            where: search,
            skip,
            take,
            orderBy: { id: 'asc' },
        });
        return profilePermissions;
    }
    async listByProfileId(profileId, options, searchParams = []) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        searchParams.push({
            field: 'profileId',
            condition: 'equals',
            value: profileId,
        });
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const profilePermissions = await this.prisma.profilePermission.findMany({
            where: search,
            skip,
            take,
            orderBy: { id: 'asc' },
        });
        return profilePermissions;
    }
    async findById(id) {
        const profilePermission = await this.prisma.profilePermission.findUnique({
            where: { id },
        });
        return profilePermission;
    }
    async findByKeyProfileId(key, profileId) {
        const profilePermission = await this.prisma.profilePermission.findUnique({
            where: { KeyProfileId: { key, profileId } },
        });
        return profilePermission;
    }
    async delete(id) {
        await this.prisma.profilePermission.delete({
            where: { id },
        });
    }
};
exports.PrismaProfilePermissionsRepository = PrismaProfilePermissionsRepository;
exports.PrismaProfilePermissionsRepository = PrismaProfilePermissionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProfilePermissionsRepository);
//# sourceMappingURL=prisma-profile-permissions-repository.js.map