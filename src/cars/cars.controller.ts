import { Body, Controller,Get, Param,Post, ValidationPipe,Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { createCarDto } from './dto/create-car.dto';
import { updateCarDto } from './dto/updtae-car.dto';

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

    @Put(':id')
    async putCarById(@Param('id',ParseIntPipe) id: string,@Body(ValidationPipe) car:updateCarDto ){
        return this.carsService.putCarById(id,car);
    }


    @Delete(':id')
    async deleteCarById(@Param('id') id:string){
        return this.carsService.deleteCarById(id);
    }   



}
