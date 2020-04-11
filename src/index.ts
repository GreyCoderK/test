import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './App';
import TypeUserController from './controller/type_user.controller';
import TypeArticleController from './controller/type_article.controller';
import MenuVerticalController from './controller/menu_vertical.controller';
import ArticleController from './controller/article.controller';
import AuthenticationController from './controller/authentication.controller';

(async () => {
  try {
    await createConnection();
  } catch (error) {
    console.log('Erreur lors de la connexion à la base de donée', error);
    return error;
  }

  const port = Number(process.env.PORT) || 7777;
  const app = new App(
    [
      new TypeUserController(),
      new TypeArticleController(),
      new MenuVerticalController(),
      new ArticleController(),
      new AuthenticationController(),
    ],
    port,
  );
  app.listen();
})();
