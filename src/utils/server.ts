import express, { Application } from "express";

function createServer() {
    const app: Application = express();

    app.use(express.json());
}

