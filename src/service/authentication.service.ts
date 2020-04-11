import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import UserWithThatEmailAlreadyExistsException from '../exception/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import TokenData from '../interfaces/tokenData.interface';
import CreateUserDto from '../dto/user.dto';
import { User } from '../entity/User';

class AuthenticationService {
  userRepository = getRepository(User);

  public async register(userData: CreateUserDto) {
    if (await this.userRepository.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userRepository.create({
      nom: userData.nom,
      email: userData.email,
      contact: userData.contact,
      birthday: userData.birthday,
      prenoms: userData.prenoms,
      password: hashedPassword,
    });
    const tokenData = this.createToken(newUser);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      newUser,
    };
  }

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      id: `${user.id}`,
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
