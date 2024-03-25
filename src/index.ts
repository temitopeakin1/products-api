import express, { Application } from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes"; 
import errorHandler from "./middleware/errorHandler";
import connectDb from "../config/dbConnection";

dotenv.config();

connectDb();
const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000");

app.get("/", (req: Request, res: Response) => {
  res.send("Server is fine and ready boom");
});

// Middleware for error handling
app.use(errorHandler);

// Middleware for body-parser
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); 

// Server to listen to the specific port (3000)
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
