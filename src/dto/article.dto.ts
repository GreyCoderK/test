import { IsNumber, IsString, IsOptional } from 'class-validator';

export class ArticleDto {
  @IsString()
  libelle: string;

  @IsString()
  reference: string;

  @IsString()
  detail: string;

  @IsNumber()
  prix: number;

  @IsOptional()
  typeArticle?: number;
}
