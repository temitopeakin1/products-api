import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Define a custom interface to represent the user object in the decoded JWT
interface DecodedUser {
    username: string;
    email: string;
    id: string;
}

// extend to include the user property
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
                req.user = decoded as DecodedUser;
                console.log("Decoded User:", req.user); 
                next();              
            });

            if (!token) {
                res.status(401);
                throw new Error("token is missing or user not authorized")
            }
        }
    }
});


export default validateToken;


// const validateToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer")) {
//         res.status(401).json({ message: "Unauthorized: Token missing or invalid" });
//         return;
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//         res.status(401).json({ message: "Unauthorized: Token missing or invalid" });
//         return;
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as DecodedUser;
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
// });

// export default validateToken;
