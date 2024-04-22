import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './app/app.entity';
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';
import { Category } from './category/category.entity';
import { Developer } from './developer/developer.entity';
import { Platform } from './platform/platform.entity';
import { Review } from './review/review.entity';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { CategoryService } from './category/category.service';
import { DeveloperService } from './developer/developer.service';
import { PlatformService } from './platform/platform.service';
import { ReviewService } from './review/review.service';
import { DeveloperController } from './developer/developer.controller';
import { CategoryController } from './category/category.controller';
import { PlatformController } from './platform/platform.controller';
import { ReviewController } from './review/review.controller';
import { UserController } from './user/user.controller';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      App,
      Category,
      Developer,
      Platform,
      Review,
      User
    ]),
  ],
  providers: [
    AppService,
    CategoryService,
    DeveloperService,
    PlatformService,
    ReviewService,
    UserService
  ],
  controllers: [
    AppController,
    CategoryController,
    DeveloperController,
    PlatformController,
    ReviewController,
    UserController
  ],
  exports: [
    AppService,
    CategoryService,
    DeveloperService,
    PlatformService,
    ReviewService,
    UserService
  ],
})
export class EntitiesModule {}
