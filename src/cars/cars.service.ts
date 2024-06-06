import { Injectable,HttpException } from '@nestjs/common';
import { CARS } from './car.mock';
import { createCarDto } from './dto/create-car.dto';
import { updateCarDto } from './dto/updtae-car.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {ICar} from './interface/car.interface'

@Injectable()
export class CarsService {
    constructor(@InjectModel('Car') private readonly carModel:Model<ICar>){

    }
    private cars=CARS;
    async getCars():Promise<createCarDto[]>{
        // return this.cars;
        // return new Promise((resolve)=>{
        //     return resolve(this.cars);
        // })

        const cars=this.carModel.find().exec();
        if((await cars).length===0){
            throw new HttpException('no car present in the database',404);
        }
        return cars;
    }

    async findOne(id:string):Promise<createCarDto>{
        // return new Promise((resolve)=>{
        //     const findCar= this.cars.find(car=>car.id===parseInt(id));

        //     if(findCar){
        //         return resolve(findCar);
        //     }else{
        //         throw new HttpException('Car not found',404);
        //     }
        // })

        // const a=parseInt(id);
        // console.log("id is ",a);

        const findCarById=this.carModel.findById(id);
        if(findCarById){
            return findCarById
        }else{
            throw new HttpException('no car with this id found',404)
        }
    }

    async postCar(car:createCarDto){
        const addCar=await new this.carModel(car)
        await addCar.save();

        return addCar;
    }

    async deleteCarById(id:string): Promise<String> {
        // const newCar=this.cars.filter(car=>car.id!==parseInt(id));
        // return newCar;

        // const index=this.cars.findIndex(car=>car.id===parseInt(id));
        // if(index===-1){
        //     throw new HttpException('Car not found',404);
        // }else{
        //     this.cars.splice(index,1);
        //     return this.cars;
        // }

        const deleteCar=await this.carModel.findByIdAndDelete(id).exec()

        return "car has been deleted"
    }

  async putCarById(id:string,car: updateCarDto):Promise<String> {
    // const index = this.cars.findIndex((oldCar) => oldCar.id === parseInt(id));

    // if (index === -1) {
    //   throw new HttpException('Car not found', 404);
    // } else {
    //   const updatedCar = {
    //     id: car.id,
    //     COLOR: car.COLOR || this.cars[index].COLOR,
    //     brand: car.brand || this.cars[index].brand,
    //     model: car.model || this.cars[index].model,
    //   };
    //   this.cars[index] = updatedCar;
    //   return this.cars;
    // }

    const Carfind=await this.carModel.findById(id)
    if(Carfind){
        Carfind.COLOR=car.COLOR || Carfind.COLOR
        Carfind.brand=car.brand || Carfind.brand
        // Carfind.model=car.model || Carfind.model

        await Carfind.save();

        return "car has been updated"
    }else{
        throw new HttpException('the car with this id not found',404);
    }
  }
}
