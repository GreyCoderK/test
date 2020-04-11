import * as express from 'express';
import { getRepository } from 'typeorm';
import controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { TypeArticle } from '../entity/TypeArticle';
import { TypeArticleDto } from '../dto/type_article.dto';
import NotFoundException from '../exception/notFoundException';

class TypeArticleController implements controller {

  public path = '/type_article';
  public router = express.Router();

  private typeArticleRepository = getRepository(TypeArticle);

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllTypeArticle);
    this.router.get(`${this.path}/:id`, this.getTypeArticle);
    this.router.put(`${this.path}/:id`, validationMiddleware(TypeArticleDto, true), this.modifyTypeArticle);
    this.router.delete(`${this.path}/:id`, this.deleteTypeArticle);
    this.router.post(this.path, validationMiddleware(TypeArticleDto), this.createATypeArticle);
  }

  private getAllTypeArticle = async (request: express.Request, response: express.Response) => {
    const typeArticles = await this.typeArticleRepository.find();
    response.send(typeArticles);
  }

  private getTypeArticle = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const typeArticle = await this.findTypeArticle(id);
    if (typeArticle) {
      response.send(typeArticle);
    } else {
      next(new NotFoundException(id));
    }
  }

  private createATypeArticle = async(request: express.Request, response: express.Response) => {
    const typeArticle: TypeArticle = request.body;
    const newTypeArticle = this.typeArticleRepository.create(typeArticle);
    await this.typeArticleRepository.save(newTypeArticle);
    response.send(newTypeArticle);
  }

  private modifyTypeArticle = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const typeArticle: TypeArticle = request.body;
    await this.typeArticleRepository.update(id, typeArticle);
    const updatedTypeArticle = await this.typeArticleRepository.findOne(id);
    if (updatedTypeArticle) {
      response.send(updatedTypeArticle);
    } else {
      next(new NotFoundException(id));
    }
  }

  private deleteTypeArticle = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    if (this.findTypeArticle(id)) {
      await this.typeArticleRepository.delete(id);
      response.sendStatus(200);
    }else {
      next(new NotFoundException(id));
    }
  }

  private findTypeArticle = async (item) => {
    return await this.typeArticleRepository.findOne(item) || await this.typeArticleRepository.findOne({ libelle:item });
  }
}

export default TypeArticleController;
