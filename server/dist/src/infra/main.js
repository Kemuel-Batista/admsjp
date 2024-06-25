"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const socket_io_adapter_1 = require("./websocket/socket-io-adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATH', 'OPTIONS', 'HEAD'],
        origin: ['http://localhost:3000'],
    };
    app.enableCors(corsOptions);
    app.use(cookieParser());
    const configService = app.get(config_1.ConfigService);
    app.useWebSocketAdapter(new socket_io_adapter_1.SocketIOAdapter(app, configService));
    const port = configService.get('PORT', { infer: true });
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map