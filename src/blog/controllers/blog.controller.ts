import {
  Body,
  Put,
  Param,
  Controller,
  Post,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { BlogDto } from '../dtos/blog-dto';
import { GetBlogBody } from '../dtos/get-blog-body';
import BlogService from '../services/blog.service';

@Controller('blog')
class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtGuard)
  @Post('')
  getBlogs(@Body() getBlogBody: GetBlogBody) {
    return this.blogService.getBlogs(getBlogBody.take, getBlogBody.skip);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createBlog(@Body() blogDto: BlogDto, @Req() req) {
    return this.blogService.createBlog(blogDto, req.user.username, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  updateBlog(@Param('id') id: number, @Body() blogDto: BlogDto, @Req() req) {
    return this.blogService.updateBlog(
      id,
      blogDto.title,
      blogDto.content,
      req.user.username,
      req.user.id,
    );
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: number) {
    return this.blogService.deleteBlog(id);
  }
}

export default BlogController;
