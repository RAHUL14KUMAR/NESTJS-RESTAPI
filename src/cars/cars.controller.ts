import { Body, Controller,Get, Param,Post, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { createCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    async getCars(){
        return this.carsService.getCars();
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return this.carsService.findOne(id);
    }

    @Post()
    async postCar(@Body(ValidationPipe) car:createCarDto ){
        return this.carsService.postCar(car);
    }



}
