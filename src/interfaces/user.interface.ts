
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import TypeUserDto from '../dto/type_user.dto';
import { TypeUser } from '../entity/TypeUser';

class User {
  nom: string;

  prenoms: string;

  birthday: string;

  email: string;

  contact: string;

  password: string;

  typeUser?: TypeUser;
}

export default User;
