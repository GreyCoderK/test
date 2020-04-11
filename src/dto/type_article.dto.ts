import { IsString, IsOptional } from 'class-validator';
import { Article } from '../entity/Article';

export class TypeArticleDto {
  @IsString()
  libelle: string;

  @IsOptional()
  articles: Article[];
}
