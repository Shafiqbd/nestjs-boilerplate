import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(signupDto: SignUpDto) {
    const { name, password, email, type } = signupDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      type,
      password: hashPassword,
    });

    try {
      const res = await this.userRepository.save(user);
      if (res) {
        return {
          message: 'Data created successfully',
          statusCode: 200,
          data: res,
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    const { password, email, type } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    user.type = type;
    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      email: user.email,
      password: user.password,
    });
    try {
      if (token) {
        return {
          message: 'Data get successfully',
          statusCode: 200,
          token: token,
          data: user,
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
