import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

//get all products
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// get a particular product
const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res
    .status(200)
    .json({ message: `Product exist for ${req.params.id}`, product: product });
});

// post/create a product
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  console.log("The Request body is:", req.body);
  const { name, description, price, category, manufacturer } = req.body;
  if (!name || !description || !price || !category || !manufacturer) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
    manufacturer,
  });
  res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });

  //   res.status(201).json(product);
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res
    .status(200)
    .json({
      message: `Product updated for ${req.params.id}`,
      product: updatedProduct,
    });
});

// delete a product
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: product });
 
  res
    .status(200)
    .json({
      message: `Product deleted for ${req.params.id}`,
      product: product,
    });
});

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
