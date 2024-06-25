"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraTicketGenerator = void 0;
class InfraTicketGenerator {
    async generate(type, lastTicket) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        let count;
        if (lastTicket !== '') {
            const splitTicket = lastTicket.split(type);
            const countPart = splitTicket[1];
            if (countPart) {
                count = parseInt(countPart) + 1;
            }
            else {
                count = 1;
            }
        }
        else {
            count = 1;
        }
        const ticket = `${year}${month}${day}${type}${count.toString().padStart(4, '0')}`;
        return ticket;
    }
}
exports.InfraTicketGenerator = InfraTicketGenerator;
//# sourceMappingURL=infra-ticket-generator.js.map