import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Define a custom interface to represent the user object in the decoded JWT
interface DecodedUser {
    username: string;
    email: string;
    id: string;
}

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: DecodedUser;
        }
    }
}

const validateToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (typeof authHeader === "string") {
        if (authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            // verify token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("Unauthorized User");
                }
                // Cast decoded as DecodedUser
                req.user = decoded as DecodedUser;
                next();              
            });

            if (!token) {
                res.status(401);
                throw new Error("token is missing")
            }
        }
    }
});

export default validateToken;
