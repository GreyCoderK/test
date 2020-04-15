"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const UserWithThatEmailAlreadyExistsException_1 = __importDefault(require("../exception/UserWithThatEmailAlreadyExistsException"));
const User_1 = require("../entity/User");
class AuthenticationService {
    constructor() {
        this.userRepository = typeorm_1.getRepository(User_1.User);
    }
    async register(userData) {
        if (await this.userRepository.findOne({ email: userData.email })) {
            throw new UserWithThatEmailAlreadyExistsException_1.default(userData.email);
        }
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const newUser = await this.userRepository.create({
            nom: userData.nom,
            email: userData.email,
            contact: userData.contact,
            birthday: userData.birthday,
            prenoms: userData.prenoms,
            password: hashedPassword,
        });
        const tokenData = this.createToken(newUser);
        const cookie = this.createCookie(tokenData);
        return {
            cookie,
            newUser,
        };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    createToken(user) {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = {
            id: `${user.id}`,
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}
exports.default = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map