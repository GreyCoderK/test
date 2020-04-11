import { ManyToOne, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TypeArticle } from './TypeArticle';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length:100,
  })
  reference:string;

  @Column({
    length: 150,
  })
  libelle :string;

  @Column({
    type: 'text',
    nullable: true,
  })
  detail: string;

  @Column({
    default: 0,
    type: 'integer',
  })
  prix:number;

  @ManyToOne(type => TypeArticle, typeArticle => typeArticle.articles, {
    nullable: true,
  })
  typeArticle : TypeArticle;

}
