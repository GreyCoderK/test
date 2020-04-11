import { ManyToOne, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TypeUser } from './TypeUser';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length:20,
  })
  nom: string;

  @Column({
    length:30,
  })
  prenoms: string;

  @Column('date', {
    nullable: true,
  })
  birthday: Date;

  @Column('varchar', {
    length: 35,
  })
  email: string;

  @Column('varchar', {
    length: 35,
  })
  contact: string;

  @Column('varchar')
  password: string;

  @ManyToOne(type => TypeUser, typeUser => typeUser.users, { nullable: true })
  typeUser : TypeUser;
}
