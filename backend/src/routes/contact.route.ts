import { Router } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import * as AWS from "aws-sdk";
import { Routes } from "@interfaces/routes.interface";
import ContactController from "@/controllers/mailer.controller";

class ContactRoute implements Routes {
  public path = "/contact";
  public router = Router();
  public contactController = new ContactController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/get-touch`, this.contactController.sendmail);

    // this.router.post(
    //   `${this.path}/join-us`,
    //   upload.single("file"), // Handle file upload for "join-us"
    //   this.contactController.joinUs,
    // );
  }
}

export default ContactRoute;
