"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.failure = exports.Success = exports.Failure = void 0;
class Failure {
    value;
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return false;
    }
    isError() {
        return true;
    }
}
exports.Failure = Failure;
class Success {
    value;
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return true;
    }
    isError() {
        return false;
    }
}
exports.Success = Success;
const failure = (value) => {
    return new Failure(value);
};
exports.failure = failure;
const success = (value) => {
    return new Success(value);
};
exports.success = success;
//# sourceMappingURL=either.js.map