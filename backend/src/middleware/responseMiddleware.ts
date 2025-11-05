import { Request, NextFunction } from "express";
import { BaseResponseDto } from "../common/dto";
import { ExtendedResponse } from "../common/express";
import { logger } from "../utils/logger";

export const handleOk = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.ok = function (data: any, statusCode?: number) {
    let output: BaseResponseDto = {
      success: true,
      data: data,
    };
    response.status(statusCode || 200).send(output);
  };
  next();
};

export const handleNotFound = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.notFound = function () {
    let output: BaseResponseDto = {
      success: false,
      data: null,
      validation_messages: null,
      error: "Resource not found",
    };
    response.status(404).send(output);
  };
  next();
};

export const handleUnHandled = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.unhandled = function (exception: any) {
    logger.error(exception);
    let output: BaseResponseDto = {
      success: false,
      data: null,
      validation_messages: null,
      error: "Unable to process the request. Please contact administrator",
    };
    response.status(500).send(output);
  };
  next();
};

export const handleBusinessValidationFailure = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.businessValidationFailure = function (error: any) {
    let output: BaseResponseDto = {
      success: false,
      data: null,
      validation_messages: null,
      error:
        error || "Unable to process the request. Please contact administrator",
    };
    response.status(422).send(output);
  };
  next();
};

export const handleUnAuthorised = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.unauthorised = function (error?: string) {
    let output: BaseResponseDto = {
      success: false,
      data: null,
      validation_messages: null,
      error: error || "Unautherised to handle the requested api",
    };
    response.status(401).send(output);
  };
  next();
};

export const handleBadRequest = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.badRequest = function (validation_messages?: any) {
    let output: any = {
      success: false,
      data: null,
      validation_messages: validation_messages,
      error: null,
    };
    response.status(400).send(output);
  };
  next();
};

export const handleForbidden = (
  request: Request,
  response: ExtendedResponse,
  next: NextFunction
) => {
  response.forbidden = function () {
    let output: any = {
      success: false,
      data: null,
      validation_messages: null,
      error: "Forbidden to handle the requested api",
    };
    response.status(403).send(output);
  };
  next();
};
