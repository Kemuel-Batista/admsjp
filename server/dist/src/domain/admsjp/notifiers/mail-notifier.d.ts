export interface MailNotifierProps {
    email: string;
    title: string;
    content: string;
    renderedHtml: string;
}
export declare abstract class MailNotifier {
    abstract send(params: MailNotifierProps): Promise<void>;
}
