import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          database: configService.get('MYSQL_DATABASE'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          synchronize: configService.get('MYSQL_SYNCHRONIZE'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
