import {IsString} from 'class-validator';
export class createCarDto{
    readonly id:number

    @IsString()
    COLOR:string

    @IsString()
    brand:string

    @IsString()
    model:string
}