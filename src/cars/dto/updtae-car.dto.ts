import { createCarDto } from "./create-car.dto";
import {PartialType} from "@nestjs/mapped-types";

export class updateCarDto extends PartialType(createCarDto){}