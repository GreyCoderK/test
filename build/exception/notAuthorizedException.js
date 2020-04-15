"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("./httpException"));
class NotAuthorizedException extends httpException_1.default {
    constructor() {
        super(403, "Vous n'avez pas une autorisation d'acces");
    }
}
exports.default = NotAuthorizedException;
//# sourceMappingURL=notAuthorizedException.js.map