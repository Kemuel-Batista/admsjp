import { TicketGenerator } from '@/domain/admsjp/generators/ticket-generator';
export declare class InfraTicketGenerator implements TicketGenerator {
    generate(type: string, lastTicket: string): Promise<string>;
}
