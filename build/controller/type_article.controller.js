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
const TypeArticle_1 = require("../entity/TypeArticle");
const type_article_dto_1 = require("../dto/type_article.dto");
const notFoundException_1 = __importDefault(require("../exception/notFoundException"));
class TypeArticleController {
    constructor() {
        this.path = '/type_article';
        this.router = express.Router();
        this.typeArticleRepository = typeorm_1.getRepository(TypeArticle_1.TypeArticle);
        this.getAllTypeArticle = async (request, response) => {
            const typeArticles = await this.typeArticleRepository.find();
            response.send(typeArticles);
        };
        this.getTypeArticle = async (request, response, next) => {
            const id = request.params.id;
            const typeArticle = await this.findTypeArticle(id);
            if (typeArticle) {
                response.send(typeArticle);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.createATypeArticle = async (request, response) => {
            const typeArticle = request.body;
            const newTypeArticle = this.typeArticleRepository.create(typeArticle);
            await this.typeArticleRepository.save(newTypeArticle);
            response.send(newTypeArticle);
        };
        this.modifyTypeArticle = async (request, response, next) => {
            const id = request.params.id;
            const typeArticle = request.body;
            await this.typeArticleRepository.update(id, typeArticle);
            const updatedTypeArticle = await this.typeArticleRepository.findOne(id);
            if (updatedTypeArticle) {
                response.send(updatedTypeArticle);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.deleteTypeArticle = async (request, response, next) => {
            const id = request.params.id;
            if (this.findTypeArticle(id)) {
                await this.typeArticleRepository.delete(id);
                response.sendStatus(200);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.findTypeArticle = async (item) => {
            return await this.typeArticleRepository.findOne(item) || await this.typeArticleRepository.findOne({ libelle: item });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllTypeArticle);
        this.router.get(`${this.path}/:id`, this.getTypeArticle);
        this.router.put(`${this.path}/:id`, validation_middleware_1.default(type_article_dto_1.TypeArticleDto, true), this.modifyTypeArticle);
        this.router.delete(`${this.path}/:id`, this.deleteTypeArticle);
        this.router.post(this.path, validation_middleware_1.default(type_article_dto_1.TypeArticleDto), this.createATypeArticle);
    }
}
exports.default = TypeArticleController;
//# sourceMappingURL=type_article.controller.js.map