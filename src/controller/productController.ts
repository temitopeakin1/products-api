import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

//get all products
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({ user_id: req.user?.id });
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
  // Log user object
  console.log("User:", req.user);
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
    user_id: req.user?.id,
  });
  res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });

  //   res.status(201).json(product);
});

// update a particular product
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user_id.toString() !== req.user?.id) {
    res.status(401);
    throw new Error(
      "Users don't have the permission to update other user's product"
    );
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: `Product updated for ${req.params.id}`,
    product: updatedProduct,
  });
});

// delete a particular product
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user_id.toString() !== req.user?.id) {
    res.status(401);
    throw new Error(
      "Users don't have the permission to update other user's product"
    );
  }

  await Product.deleteOne({ _id: product });

  res.status(200).json({
    message: `Product deleted for ${req.params.id}`,
    product: product,
  });
});

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
