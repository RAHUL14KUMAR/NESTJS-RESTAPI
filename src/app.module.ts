import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/NEST_CAR`),
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
