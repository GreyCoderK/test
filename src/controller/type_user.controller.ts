import * as express from 'express';
import { getRepository } from 'typeorm';
import controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { TypeUser } from '../entity/TypeUser';
import TypeUserDto from '../dto/type_user.dto';
import NotFoundException from '../exception/notFoundException';

class TypeUserController implements controller {

  public path = '/type_user';
  public router = express.Router();

  private typeUserRepository = getRepository(TypeUser);

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllTypeUser);
    this.router.get(`${this.path}/:id`, this.getTypeUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(TypeUserDto, true), this.modifyTypeUser);
    this.router.delete(`${this.path}/:id`, this.deleteTypeUser);
    this.router.post(this.path, validationMiddleware(TypeUserDto), this.createATypeUser);
  }

  private getAllTypeUser = async (request: express.Request, response: express.Response) => {
    const typeUsers = await this.typeUserRepository.find();
    response.send(typeUsers);
  }

  private getTypeUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const typeUser = await this.findTypeUser(id);
    if (typeUser) {
      response.send(typeUser);
    } else {
      next(new NotFoundException(id));
    }
  }

  private createATypeUser = async(request: express.Request, response: express.Response) => {
    const typeUser: TypeUser = request.body;
    const newTypeUser = this.typeUserRepository.create(typeUser);
    await this.typeUserRepository.save(newTypeUser);
    response.send(newTypeUser);
  }

  private modifyTypeUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const typeUser: TypeUser = request.body;
    await this.typeUserRepository.update(id, typeUser);
    const updatedTypeUser = await this.typeUserRepository.findOne(id);
    if (updatedTypeUser) {
      response.send(updatedTypeUser);
    } else {
      next(new NotFoundException(id));
    }
  }

  private deleteTypeUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    if (this.findTypeUser(id)) {
      await this.typeUserRepository.delete(id);
      response.sendStatus(200);
    }else {
      next(new NotFoundException(id));
    }
  }

  private findTypeUser = async (item) => {
    return await this.typeUserRepository.findOne(item) || await this.typeUserRepository.findOne({ libelle:item });
  }
}

export default TypeUserController;
