"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("./httpException"));
class WrongAuthenticationTokenException extends httpException_1.default {
    constructor() {
        super(401, "Mauvais token d'authentification");
    }
}
exports.default = WrongAuthenticationTokenException;
//# sourceMappingURL=wrongAuthenticationTokenException.js.map