import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  user_id: mongoose.Types.ObjectId; 
  name: string;
  description: string;
  price: number;
  category: string;
  manufacturer: string;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  manufacturer: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
