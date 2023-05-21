import { NotFoundException } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user.interface';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userRepo.findOneBy({
      username,
    });

    
    if (user != null) {
      const isValid = await bcrypt.compare(pass, user.password);

      if (isValid) {
        user.password = '';
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async login(usere: User) {
    try {
      const { username, password } = usere;
      const user = await this.validateUser(username, password);
      
      if (!user) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      const token = await this.jwtservice.signAsync(
        { user },
        {
          expiresIn: '9999 years',
        },
      );

      return {
        token,
      };
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async registerUser(user) {
    const { username, password } = user;

    const hashed_password = await this.hashPassword(password);


    try {
      const user = await this.userRepo.save({
        username,
        password: hashed_password,
      });

      return {
        data: user,
      };
    } catch (e) {
      throw NotFoundException;
    }
  }
}
