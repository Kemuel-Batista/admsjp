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
exports.SendGridNotifier = void 0;
const common_1 = require("@nestjs/common");
const mail_1 = require("@sendgrid/mail");
const winston_config_1 = require("../config/winston-config");
const env_service_1 = require("../env/env.service");
let SendGridNotifier = class SendGridNotifier {
    env;
    client;
    SENDGRID_EMAIL_ADDRESS;
    constructor(env) {
        this.env = env;
        const sendGridApiKey = env.get('SENDGRID_API_KEY');
        this.client = new mail_1.MailService();
        this.client.setApiKey(sendGridApiKey);
        this.SENDGRID_EMAIL_ADDRESS = env.get('SENDGRID_EMAIL_ADDRESS');
    }
    async send({ email, title, content, renderedHtml, }) {
        const msg = {
            to: email,
            from: this.SENDGRID_EMAIL_ADDRESS,
            subject: title,
            text: content,
            html: renderedHtml,
        };
        await this.client.send(msg).catch((err) => {
            winston_config_1.logger.error(`SendGrid Notifier Error - ${JSON.stringify(err)}`);
        });
    }
};
exports.SendGridNotifier = SendGridNotifier;
exports.SendGridNotifier = SendGridNotifier = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], SendGridNotifier);
//# sourceMappingURL=sendgrid-notifier.js.map