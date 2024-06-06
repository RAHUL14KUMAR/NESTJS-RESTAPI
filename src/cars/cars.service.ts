import { Injectable,HttpException } from '@nestjs/common';
import { CARS } from './car.mock';
import { createCarDto } from './dto/create-car.dto';
import { updateCarDto } from './dto/updtae-car.dto';
import { resolve } from 'path';

@Injectable()
export class CarsService {
    private cars=CARS;
    async getCars():Promise<createCarDto[]>{
        // return this.cars;
        return new Promise((resolve)=>{
            return resolve(this.cars);
        })
    }

    async findOne(id:string):Promise<createCarDto>{
        return new Promise((resolve)=>{
            const findCar= this.cars.find(car=>car.id===parseInt(id));

            if(findCar){
                return resolve(findCar);
            }else{
                throw new HttpException('Car not found',404);
            }
        })
    }

    async postCar(car:createCarDto){
        this.cars.push(car);
        return this.cars;
    }

    async deleteCarById(id:string){
        // const newCar=this.cars.filter(car=>car.id!==parseInt(id));
        // return newCar;

        const index=this.cars.findIndex(car=>car.id===parseInt(id));
        if(index===-1){
            throw new HttpException('Car not found',404);
        }else{
            this.cars.splice(index,1);
            return this.cars;
        }
    }

  async putCarById(id:string,car: updateCarDto) {
    const index = this.cars.findIndex((oldCar) => oldCar.id === parseInt(id));

    if (index === -1) {
      throw new HttpException('Car not found', 404);
    } else {
      const updatedCar = {
        id: car.id,
        COLOR: car.COLOR || this.cars[index].COLOR,
        brand: car.brand || this.cars[index].brand,
        model: car.model || this.cars[index].model,
      };
      this.cars[index] = updatedCar;
      return this.cars;
    }
  }
}
