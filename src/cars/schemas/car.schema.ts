import * as mongoose from 'mongoose'

export const CarSchema=new mongoose.Schema({
    id:Number,
    COLOR:String,
    brand:String,
    model:String
})