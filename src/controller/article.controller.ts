import * as express from 'express';
import { getRepository } from 'typeorm';
import controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { Article } from '../entity/Article';
import { ArticleDto } from '../dto/article.dto';
import NotFoundException from '../exception/notFoundException';

class ArticleController implements controller {
  public path = '/article';
  public router = express.Router();
  private articleRepository = getRepository(Article);

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllArticle);
    this.router.get(`${this.path}/:id`, this.getArticle);
    this.router.put(`${this.path}/:id`, validationMiddleware(ArticleDto, true), this.modifyArticle);
    this.router.delete(`${this.path}/:id`, this.deleteArticle);
    this.router.post(this.path, validationMiddleware(ArticleDto), this.createAArticle);
  }

  private getAllArticle = async (request: express.Request, response: express.Response) => {
    const articles = await this.articleRepository.find();
    response.send(articles);
  }

  private getArticle = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const article = await this.findArticle(id);
    if (article) {
      response.send(article);
    } else {
      next(new NotFoundException(id));
    }
  }

  private createAArticle = async(request: express.Request, response: express.Response) => {
    const article: Article = request.body;
    const newArticle = this.articleRepository.create(article);
    await this.articleRepository.save(newArticle);
    response.send(newArticle);
  }

  private modifyArticle = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const article: Article = request.body;
    await this.articleRepository.update(id, article);
    const updatedArticle = await this.articleRepository.findOne(id);
    if (updatedArticle) {
      response.send(updatedArticle);
    } else {
      next(new NotFoundException(id));
    }
  }

  private deleteArticle = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    if (this.findArticle(id)) {
      await this.articleRepository.delete(id);
      response.sendStatus(200);
    }else {
      next(new NotFoundException(id));
    }
  }

  private findArticle = async (item) => {
    return await this.articleRepository.findOne(item) || await this.articleRepository.findOne({ libelle:item });
  }
}

export default ArticleController;
