/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { GetUser } from 'src/user/get-user.decorator';
import { UserModel } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorite')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('add')
  addFavorite(
    @GetUser() user: UserModel,
    @Body('title') title: string,
    @Body('url') url: string,
    @Body('center') center: string,
    @Body('date_created') date_created: string,
    @Body('description') description: string,
    @Body('keywords') keywords: string,
  ) {
    const imageInfo = {
      title,
      url,
      center,
      date_created,
      description,
      keywords,
    };
    return this.favoriteService.createFavorite(user, imageInfo);
  }

  @Post('remove')
  deleteFavorite(@GetUser() user: UserModel, @Body('url') url: string) {
    return this.favoriteService.removeFavorite(user, url);
  }

  @Get()
  getFavorites(@GetUser() user: UserModel) {
    return this.favoriteService.getFavorites(user);
  }
}
