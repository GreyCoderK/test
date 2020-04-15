"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("./httpException"));
class UserWithThatEmailAlreadyExistsException extends httpException_1.default {
    constructor(email) {
        super(400, `l'utilisateur avec cet ${email} existe deja`);
    }
}
exports.default = UserWithThatEmailAlreadyExistsException;
//# sourceMappingURL=UserWithThatEmailAlreadyExistsException.js.map