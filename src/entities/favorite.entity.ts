import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from './user.entity';
import { ImageModel } from './image.entity';

@Entity()
export class FavoriteModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.favorites)
  user: UserModel;

  @ManyToOne(() => ImageModel, (image) => image.favorites)
  image: ImageModel;
}
