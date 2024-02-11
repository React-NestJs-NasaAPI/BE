import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { SigninUserDto } from './dto/siginin-userDto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { username, password, email } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    const newUser = await this.userRepository.save(user);
    console.log('newUser::', newUser);
    return newUser;
  }

  async signin(signinUserDto: SigninUserDto) {
    console.log(signinUserDto);
    const { email, password } = signinUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 아이디 입니다.');
    } else if (await bcrypt.compare(password, user.password)) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }
  }
}
