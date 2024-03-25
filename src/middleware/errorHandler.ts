import { Request, Response, NextFunction } from "express";
import { constants } from "../../constants";


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode: number = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
          res.json({
            title: 'Validation Failed',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    
        case constants.UNAUTHORIZED:
          res.json({
            title: 'Unauthorized',
            message: err.message,
            stackTrace: err.stack, 
          });
          break;
    
        case constants.FORBIDDEN:
          res.json({
            title: 'Forbidden',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    
        case constants.NOT_FOUND:
          res.json({
            title: 'Not found',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
    
        case constants.SERVER_ERROR:
          res.json({
            title: 'Server error',
            message: err.message,
            stackTrace: err.stack,
          });
          break;
        default:
          console.log('No Error');
          break;
      }
};

export default errorHandler;
