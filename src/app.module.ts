import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { FavoriteModel } from './entities/favorite.entity';
import { ImageModel } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, FavoriteModel, ImageModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'groom',
      entities: [UserModel, FavoriteModel, ImageModel],
      synchronize: true,
    }),
    UserModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
