import { Response } from "express";

export interface ExtendedResponse extends Response {
  ok?: any;
  notFound?: any;
  businessValidationFailure?: any;
  unauthorised?: any;
  badRequest?: any;
  unhandled?: any;
  forbidden?: any;
}
