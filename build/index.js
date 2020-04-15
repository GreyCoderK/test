"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const App_1 = __importDefault(require("./App"));
const type_user_controller_1 = __importDefault(require("./controller/type_user.controller"));
const type_article_controller_1 = __importDefault(require("./controller/type_article.controller"));
const menu_vertical_controller_1 = __importDefault(require("./controller/menu_vertical.controller"));
const article_controller_1 = __importDefault(require("./controller/article.controller"));
const authentication_controller_1 = __importDefault(require("./controller/authentication.controller"));
(async () => {
    try {
        await typeorm_1.createConnection();
    }
    catch (error) {
        console.log('Erreur lors de la connexion à la base de donée', error);
        return error;
    }
    const port = Number(process.env.PORT) || 7777;
    const app = new App_1.default([
        new type_user_controller_1.default(),
        new type_article_controller_1.default(),
        new menu_vertical_controller_1.default(),
        new article_controller_1.default(),
        new authentication_controller_1.default(),
    ], port);
    app.listen();
})();
//# sourceMappingURL=index.js.map