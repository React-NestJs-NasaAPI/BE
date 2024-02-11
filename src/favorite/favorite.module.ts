import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteModel } from 'src/entities/favorite.entity';
import { UserModule } from 'src/user/user.module';
import { ImageModel } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteModel, ImageModel]), UserModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
