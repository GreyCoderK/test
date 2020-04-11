import * as express from 'express';
import { getRepository } from 'typeorm';
import controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { MenuVertical } from '../entity/MenuVertical';
import { MenuVerticalDto } from '../dto/menu_verticale.dto';
import NotFoundException from '../exception/notFoundException';

class MenuVerticalController implements controller {

  public path = '/menu_vertical';
  public router = express.Router();

  private menuVerticalRepository = getRepository(MenuVertical);

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllMenuVertical);
    this.router.get(`${this.path}/:id`, this.getMenuVertical);
    this.router.put(`${this.path}/:id`, validationMiddleware(MenuVerticalDto, true), this.modifyMenuVertical);
    this.router.delete(`${this.path}/:id`, this.deleteMenuVertical);
    this.router.post(this.path, validationMiddleware(MenuVerticalDto), this.createAMenuVertical);
  }

  private getAllMenuVertical = async (request: express.Request, response: express.Response) => {
    const menuVerticals = await this.menuVerticalRepository.find();
    response.send(menuVerticals);
  }

  private getMenuVertical = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const menuVertical = await this.findMenuVertical(id);
    if (menuVertical) {
      response.send(menuVertical);
    } else {
      next(new NotFoundException(id));
    }
  }

  private createAMenuVertical = async(request: express.Request, response: express.Response) => {
    const menuVertical: MenuVertical = request.body;
    const newMenuVertical = this.menuVerticalRepository.create(menuVertical);
    await this.menuVerticalRepository.save(newMenuVertical);
    response.send(newMenuVertical);
  }

  private modifyMenuVertical = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const menuVertical: MenuVertical = request.body;
    await this.menuVerticalRepository.update(id, menuVertical);
    const updatedMenuVertical = await this.menuVerticalRepository.findOne(id);
    if (updatedMenuVertical) {
      response.send(updatedMenuVertical);
    } else {
      next(new NotFoundException(id));
    }
  }

  private deleteMenuVertical = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    if (this.findMenuVertical(id)) {
      await this.menuVerticalRepository.delete(id);
      response.sendStatus(200);
    }else {
      next(new NotFoundException(id));
    }
  }

  private findMenuVertical = async (item) => {
    return await this.menuVerticalRepository.findOne(item) || await  this.menuVerticalRepository.findOne({ libelle:item });
  }
}

export default MenuVerticalController;
