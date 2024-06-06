import { Injectable } from '@nestjs/common';
import { CARS } from './car.mock';
import { createCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
    private cars=CARS;
    async getCars(){
        return this.cars;
    }

    async findOne(id:string){
        return this.cars.find(car=>car.id===parseInt(id));
    }

    async postCar(car:createCarDto){
        return this.cars.push(car);
    }

    async deleteCarById(){
        return;
    }

    async putCarById(){
        return;
    }
}
