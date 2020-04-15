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
const MenuVertical_1 = require("../entity/MenuVertical");
const menu_verticale_dto_1 = require("../dto/menu_verticale.dto");
const notFoundException_1 = __importDefault(require("../exception/notFoundException"));
class MenuVerticalController {
    constructor() {
        this.path = '/menu_vertical';
        this.router = express.Router();
        this.menuVerticalRepository = typeorm_1.getRepository(MenuVertical_1.MenuVertical);
        this.getAllMenuVertical = async (request, response) => {
            const menuVerticals = await this.menuVerticalRepository.find();
            response.send(menuVerticals);
        };
        this.getMenuVertical = async (request, response, next) => {
            const id = request.params.id;
            const menuVertical = await this.findMenuVertical(id);
            if (menuVertical) {
                response.send(menuVertical);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.createAMenuVertical = async (request, response) => {
            const menuVertical = request.body;
            const newMenuVertical = this.menuVerticalRepository.create(menuVertical);
            await this.menuVerticalRepository.save(newMenuVertical);
            response.send(newMenuVertical);
        };
        this.modifyMenuVertical = async (request, response, next) => {
            const id = request.params.id;
            const menuVertical = request.body;
            await this.menuVerticalRepository.update(id, menuVertical);
            const updatedMenuVertical = await this.menuVerticalRepository.findOne(id);
            if (updatedMenuVertical) {
                response.send(updatedMenuVertical);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.deleteMenuVertical = async (request, response, next) => {
            const id = request.params.id;
            if (this.findMenuVertical(id)) {
                await this.menuVerticalRepository.delete(id);
                response.sendStatus(200);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.findMenuVertical = async (item) => {
            return await this.menuVerticalRepository.findOne(item) || await this.menuVerticalRepository.findOne({ libelle: item });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllMenuVertical);
        this.router.get(`${this.path}/:id`, this.getMenuVertical);
        this.router.put(`${this.path}/:id`, validation_middleware_1.default(menu_verticale_dto_1.MenuVerticalDto, true), this.modifyMenuVertical);
        this.router.delete(`${this.path}/:id`, this.deleteMenuVertical);
        this.router.post(this.path, validation_middleware_1.default(menu_verticale_dto_1.MenuVerticalDto), this.createAMenuVertical);
    }
}
exports.default = MenuVerticalController;
//# sourceMappingURL=menu_vertical.controller.js.map