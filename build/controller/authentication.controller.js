"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const WrongCredentialsException_1 = __importDefault(require("../exception/WrongCredentialsException"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const user_dto_1 = __importDefault(require("../dto/user.dto"));
const User_1 = require("../entity/User");
const authentication_service_1 = __importDefault(require("../service/authentication.service"));
const logIn_dto_1 = __importDefault(require("../dto/logIn.dto"));
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.Router();
        this.authenticationService = new authentication_service_1.default();
        this.user = typeorm_1.getRepository(User_1.User);
        this.registration = async (request, response, next) => {
            const userData = request.body;
            try {
                const { cookie, newUser, } = await this.authenticationService.register(userData);
                response.setHeader('Set-Cookie', [cookie]);
                response.send(newUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.loggingIn = async (request, response, next) => {
            const logInData = request.body;
            const user = await this.user.findOne({ email: logInData.email });
            if (user) {
                const isPasswordMatching = await bcrypt_1.default.compare(logInData.password, user.password);
                if (isPasswordMatching) {
                    const tokenData = this.createToken(user);
                    response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                    response.send(user);
                }
                else {
                    next(new WrongCredentialsException_1.default());
                }
            }
            else {
                next(new WrongCredentialsException_1.default());
            }
        };
        this.loggingOut = (request, response) => {
            response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
            response.send(200);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, validation_middleware_1.default(user_dto_1.default), this.registration);
        this.router.post(`${this.path}/login`, validation_middleware_1.default(logIn_dto_1.default), this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
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
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map