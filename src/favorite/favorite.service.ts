import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteModel } from 'src/entities/favorite.entity';
import { ImageModel } from 'src/entities/image.entity';
import { UserModel } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteModel)
    private readonly favoriteRepository: Repository<FavoriteModel>,
    @InjectRepository(ImageModel)
    private readonly imageRepository: Repository<ImageModel>,
  ) {}

  async createFavorite(user: UserModel, imageInfo) {
    if (!user) {
      throw new UnauthorizedException('찜 권한이 없습니다.');
    }
    // imageInfo 객체가 ImageModel 엔티티의 필드와 일치하는지 확인
    // 예를 들어, ImageModel이 { url, title, description, ... } 필드를 갖고 있다고 가정
    const existingImage = await this.imageRepository.findOne({
      where: { url: imageInfo.url },
    });
    let image;
    if (!existingImage) {
      // create 메서드에 전달하기 전에 imageInfo 객체를 검증하거나 조정
      // 모든 필수 필드가 포함되어 있고, 필드 이름이 정확한지 확인
      image = this.imageRepository.create({
        url: imageInfo.url,
        title: imageInfo.title,
        description: imageInfo.description,
        center: imageInfo.center,
        date_created: imageInfo.date_created,
        keywords: imageInfo.keywords,
      });
      await this.imageRepository.save(image);
    } else {
      // 이미지가 이미 존재하는 경우, 해당 이미지를 사용
      image = existingImage;
    }
    // 찜(Favorite) 생성
    const favorite = this.favoriteRepository.create({ user, image });
    const newFavorite = await this.favoriteRepository.save(favorite);
    return newFavorite;
  }

  async removeFavorite(user: UserModel, url: string) {
    const imageInfo = await this.imageRepository.findOne({ where: { url } });
    if (!imageInfo) {
      throw new NotFoundException('찾을 수 없는 찜입니다.');
    }
    try {
      await this.favoriteRepository.delete({
        user,
        image: { id: imageInfo.id },
      });
      return { message: '찜 취소에 성공하였습니다!' };
    } catch (err) {
      throw new InternalServerErrorException('삭제중 에러 발생!');
    }
  }

  async getFavorites(user: UserModel) {
    const favorites = await this.favoriteRepository.find({
      where: { user },
      relations: { image: true },
    });
    console.log(favorites);
    return favorites;
  }
}
