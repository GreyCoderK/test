import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from './Article';

@Entity()
export class TypeArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
  libelle: string;

  @OneToMany(type => Article, article => article.typeArticle, {
    nullable: true,
    cascade: true,
  })
  articles: Article[];
}
