// src\database\models\product.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type:String, required: true },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true },
    }, { timestamps: true });


export default mongoose.model<IProduct>('Product', ProductSchema);