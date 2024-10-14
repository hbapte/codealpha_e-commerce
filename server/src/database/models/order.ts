import mongoose, { Schema, Document } from 'mongoose';

export interface IBuyerInfo {
  name: string;
  email: string;
  phone: string;
  district: string;
  sector: string;
  city: string;
  street: string;
  house: string;
  additionalInfo?: string; // Optional field
}

export interface IProduct {
  id: string; // Assuming you want to store the product ID as a string
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  buyerInfo: IBuyerInfo[]; // Changed to array of objects
  products: IProduct[];     // Changed to array of objects
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  buyerInfo: [{ 
    type: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      district: { type: String, required: true },
      sector: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      house: { type: String, required: true },
      additionalInfo: { type: String, required: false }, // Optional
    },
    required: true 
  }],
  products: [{ 
    type: {
      id: { type: String, required: true }, // Assuming you want to keep the ID as a string
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    required: true 
  }],
  total: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
