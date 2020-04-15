"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
let TypeArticle = class TypeArticle {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TypeArticle.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 20,
        unique: true,
    }),
    __metadata("design:type", String)
], TypeArticle.prototype, "libelle", void 0);
__decorate([
    typeorm_1.OneToMany(type => Article_1.Article, article => article.typeArticle, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], TypeArticle.prototype, "articles", void 0);
TypeArticle = __decorate([
    typeorm_1.Entity()
], TypeArticle);
exports.TypeArticle = TypeArticle;
//# sourceMappingURL=TypeArticle.js.map