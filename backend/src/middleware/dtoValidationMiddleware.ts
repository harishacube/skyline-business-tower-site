import { RequestHandler, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize } from "class-sanitizer";
import { ExtendedRequest, ExtendedResponse } from "../common/express";

export function validateDTO(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req: ExtendedRequest, res: ExtendedResponse, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const formatted_errors = errors.map((error: ValidationError) => {
            return {
              property: error.property,
              message: (Object as any).values(error.constraints).join(", "),
            };
          });
          res.badRequest(formatted_errors);
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      }
    );
  };
}
