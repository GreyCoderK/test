import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MenuVertical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length:100,
  })
  libelle:string;

  @Column({
    length: 150,
  })
  icone :string;

  @Column({
    length: 25,
    nullable: true,
  })
  couleur: string;
}
