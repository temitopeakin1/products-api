import { app } from "../index";
import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get products route", () => {
    describe("given the products does not exist", () => {
      it("should return 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`api/products/${productId}`).expect(404);
      });
    });
    describe("given the products does exist", () => {
      it("should return 200 stats", async () => {
        const productId = "product-123";
        await supertest(app).get(`api/products/${productId}`).expect(404);
      });
    });
    describe("create a product route", () => {
      describe("given the user is not logged in", () => {
        it("shuld return 403", async () => {
          const { statusCode } = await supertest(app).post("/api/products");

          expect(statusCode).toBe(401);
        });
      });
    });
  });
});
