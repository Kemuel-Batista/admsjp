"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcPagination = void 0;
function calcPagination(options = {}) {
    let { page = 1, pageSize = 30, allRecords = false } = options;
    if (allRecords) {
        return { skip: undefined, take: undefined };
    }
    const maxResultsPerPage = 20;
    pageSize = Math.min(pageSize, maxResultsPerPage);
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return { skip, take };
}
exports.calcPagination = calcPagination;
//# sourceMappingURL=calc-pagination.js.map