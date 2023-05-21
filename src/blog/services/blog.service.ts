import { BlogEntity } from './../blog.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { BlogDto } from '../dtos/blog-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepo: Repository<BlogEntity>,
  ) {}

  /**
   * Get List of Blogs
   */
  async getBlogs(take: number, skip: number) {
    try {
      const total = await this.blogRepo.count();

      const results = await this.blogRepo.find({
        order: {
          id: 'DESC',
        },
        take,
        skip,
      });

      if (results.length === 0) {
        throw new NotFoundException(`Blog not found`);
      }

      return {
        data: results,
        total,
      };
    } catch {
      throw new NotFoundException(`Blog not found`);
    }
  }

  /**
   * Create Blog
   */
  async createBlog(blog: BlogDto, username: string, id: number) {
    try {
      const results = await this.blogRepo.save({
        content: blog.content,
        title: blog.title,
        username: username,
        userid: id,
      });

      return {
        data: results,
      };
    } catch {
      throw new NotFoundException(`Blog not found`);
    }
  }

  /**
   * Update specific blog by id
   */
  async updateBlog(
    id: number,
    title: string,
    content: string,
    username: string,
    user_id: number,
  ) {
    try {
      const results = await this.blogRepo.update(id, {
        content,
        title,
        username,
        userid: user_id,
      });
      return {
        data: results,
      };
    } catch {
      throw new NotFoundException();
    }
  }

  /**
   * Delete specific blog by id
   */
  async deleteBlog(id: number) {
    try {
      const results = await this.blogRepo.delete(id);

      return {
        data: results,
      };
    } catch {
      throw new NotFoundException();
    }
  }
}

export default BlogService;
