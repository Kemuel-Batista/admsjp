"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHasher = void 0;
const bcryptjs_1 = require("bcryptjs");
class BcryptHasher {
    async hash(payload) {
        return (0, bcryptjs_1.hash)(payload, 8);
    }
    async compare(payload, hashed) {
        return (0, bcryptjs_1.compare)(payload, hashed);
    }
}
exports.BcryptHasher = BcryptHasher;
//# sourceMappingURL=brcrypt-hasher.js.map