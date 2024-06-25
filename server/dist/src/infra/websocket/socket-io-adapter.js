"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOAdapter = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const cookie = require("cookie");
class SocketIOAdapter extends platform_socket_io_1.IoAdapter {
    app;
    configService;
    logger = new common_1.Logger(SocketIOAdapter.name);
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
    }
    createIOServer(port, options) {
        this.logger.log('Configuring SocketIO server');
        const server = super.createIOServer(port, options);
        const jwtService = this.app.get(jwt_1.JwtService);
        server.use((socket, next) => {
            try {
                const cookies = cookie.parse(socket.handshake.headers.cookie || '');
                const token = cookies.nextauth_token;
                const jwtKey = this.configService.get('JWT_KEY');
                const payload = jwtService.verify(token, {
                    secret: jwtKey,
                });
                socket.sub = payload.sub;
                next();
            }
            catch (error) {
                this.logger.error('Error verifying JWT token:', error);
                next(new Error('Unauthorized'));
            }
        });
        this.logger.log('Server connected');
        return server;
    }
}
exports.SocketIOAdapter = SocketIOAdapter;
//# sourceMappingURL=socket-io-adapter.js.map