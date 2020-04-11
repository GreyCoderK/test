
import { IsOptional, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  nom: string;

  @IsString()
  prenoms: string;

  @IsString()
  birthday: string;

  @IsString()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  password: string;

  @IsOptional()
  typeUser?: number;
}

export default CreateUserDto;
