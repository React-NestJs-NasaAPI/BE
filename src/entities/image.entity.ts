import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteModel } from './favorite.entity';

@Entity()
export class ImageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  center: string;

  @Column()
  date_created: string;

  @Column()
  description: string;

  @Column()
  keywords: string;

  @OneToMany(() => FavoriteModel, (favorite) => favorite.image)
  favorites: FavoriteModel[];
}
