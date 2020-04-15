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
const Article_1 = require("../entity/Article");
const article_dto_1 = require("../dto/article.dto");
const notFoundException_1 = __importDefault(require("../exception/notFoundException"));
class ArticleController {
    constructor() {
        this.path = '/article';
        this.router = express.Router();
        this.articleRepository = typeorm_1.getRepository(Article_1.Article);
        this.getAllArticle = async (request, response) => {
            const articles = await this.articleRepository.find();
            response.send(articles);
        };
        this.getArticle = async (request, response, next) => {
            const id = request.params.id;
            const article = await this.findArticle(id);
            if (article) {
                response.send(article);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.createAArticle = async (request, response) => {
            const article = request.body;
            const newArticle = this.articleRepository.create(article);
            await this.articleRepository.save(newArticle);
            response.send(newArticle);
        };
        this.modifyArticle = async (request, response, next) => {
            const id = request.params.id;
            const article = request.body;
            await this.articleRepository.update(id, article);
            const updatedArticle = await this.articleRepository.findOne(id);
            if (updatedArticle) {
                response.send(updatedArticle);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.deleteArticle = async (request, response, next) => {
            const id = request.params.id;
            if (this.findArticle(id)) {
                await this.articleRepository.delete(id);
                response.sendStatus(200);
            }
            else {
                next(new notFoundException_1.default(id));
            }
        };
        this.findArticle = async (item) => {
            return await this.articleRepository.findOne(item) || await this.articleRepository.findOne({ libelle: item });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllArticle);
        this.router.get(`${this.path}/:id`, this.getArticle);
        this.router.put(`${this.path}/:id`, validation_middleware_1.default(article_dto_1.ArticleDto, true), this.modifyArticle);
        this.router.delete(`${this.path}/:id`, this.deleteArticle);
        this.router.post(this.path, validation_middleware_1.default(article_dto_1.ArticleDto), this.createAArticle);
    }
}
exports.default = ArticleController;
//# sourceMappingURL=article.controller.js.map