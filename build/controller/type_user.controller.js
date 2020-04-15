"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const typeorm_1 = require("typeorm");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const TypeUser_1 = require("../entity/TypeUser");
const type_user_dto_1 = __importDefault(require("../dto/type_user.dto"));
const notFoundException_1 = __importDefault(require("../exception/notFoundException"));
class TypeUserController {
    constructor() {
        this.path = '/type_user';
        this.router = express.Router();
        this.typeUserRepository = typeorm_1.getRepository(TypeUser_1.TypeUser);
        this.getAllTypeUser = async (request, response) => {
            const typeUsers = await this.typeUserRepository.find();
            response.send(typeUsers);
        };
        this.getTypeUser = async (request, response, next) => {
            const id = request.params.id;
            const typeUser = await this.findTypeUser(id);
            if (typeUser) {
                response.send(typeUser);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.createATypeUser = async (request, response) => {
            const typeUser = request.body;
            const newTypeUser = this.typeUserRepository.create(typeUser);
            await this.typeUserRepository.save(newTypeUser);
            response.send(newTypeUser);
        };
        this.modifyTypeUser = async (request, response, next) => {
            const id = request.params.id;
            const typeUser = request.body;
            await this.typeUserRepository.update(id, typeUser);
            const updatedTypeUser = await this.typeUserRepository.findOne(id);
            if (updatedTypeUser) {
                response.send(updatedTypeUser);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.deleteTypeUser = async (request, response, next) => {
            const id = request.params.id;
            if (this.findTypeUser(id)) {
                await this.typeUserRepository.delete(id);
                response.sendStatus(200);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.findTypeUser = async (item) => {
            return await this.typeUserRepository.findOne(item) || await this.typeUserRepository.findOne({ libelle: item });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllTypeUser);
        this.router.get(`${this.path}/:id`, this.getTypeUser);
        this.router.put(`${this.path}/:id`, validation_middleware_1.default(type_user_dto_1.default, true), this.modifyTypeUser);
        this.router.delete(`${this.path}/:id`, this.deleteTypeUser);
        this.router.post(this.path, validation_middleware_1.default(type_user_dto_1.default), this.createATypeUser);
    }
}
exports.default = TypeUserController;
//# sourceMappingURL=type_user.controller.js.map