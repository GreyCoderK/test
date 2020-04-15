"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("./httpException"));
class WrongCredentialsException extends httpException_1.default {
    constructor() {
        super(401, "Mauvaises informations d'identification fournies");
    }
}
exports.default = WrongCredentialsException;
//# sourceMappingURL=WrongCredentialsException.js.map