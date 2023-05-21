import { BlogEntity } from './blog.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import BlogService from './services/blog.service';
import BlogController from './controllers/blog.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([BlogEntity])],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
