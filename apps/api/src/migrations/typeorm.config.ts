import { DataSource } from 'typeorm';
import { App, Feature } from '../app/entities/app/app.entity';
import { Category } from '../app/entities/category/category.entity';
import { Developer } from '../app/entities/developer/developer.entity';
import { Platform } from '../app/entities/platform/platform.entity';
import { Review } from '../app/entities/review/review.entity';
import { User } from '../app/entities/user/user.entity';

/*
* TypeORM Data Source used for generating database migrations
* To build a migration, run `nx run api:typeorm-generate-migration MIGRATION_NAME`
* for example: `nx run api:typeorm-generate-migration InitialiseDatabase`
* */
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'accesshub',
  password: 'password',
  database: 'accesshub',
  entities: [
    App,
    Feature,
    Category,
    Developer,
    Platform,
    Review,
    User
  ],
});

