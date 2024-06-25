"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateProvider = void 0;
class DateProvider {
    addDays(days, date) {
        const newDate = date || new Date();
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }
}
exports.DateProvider = DateProvider;
//# sourceMappingURL=date-provider.js.map