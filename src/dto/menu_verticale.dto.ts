import { IsString } from 'class-validator';

export class MenuVerticalDto {
  @IsString()
  libelle: string;

  @IsString()
  icone: string;

  @IsString()
  couleur: string;
}
