import { IsString, IsOptional } from 'class-validator';
import { User } from '../entity/User';

class TypeUserDto {

  @IsString()
  libelle: string;

  @IsOptional()
  users: User[];
}

export default TypeUserDto;
