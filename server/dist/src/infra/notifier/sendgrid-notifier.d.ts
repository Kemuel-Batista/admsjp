import { MailNotifier, MailNotifierProps } from '@/domain/admsjp/notifiers/mail-notifier';
import { EnvService } from '../env/env.service';
export declare class SendGridNotifier implements MailNotifier {
    private env;
    private client;
    private SENDGRID_EMAIL_ADDRESS;
    constructor(env: EnvService);
    send({ email, title, content, renderedHtml, }: MailNotifierProps): Promise<void>;
}
