import { NextFunction, Request, Response } from "express";
import { EHttpStatusCodes } from "@/common-new";
import * as dto from "@/dto/mailer.dto";
import MailerService from "@/services/mailer.service";
class MailerController {
  private mailerService = new MailerService();

  public sendmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceRequest: dto.SendMailRequestDto = req.body;
      const data = await this.mailerService.sendmail(serviceRequest);

      res.status(EHttpStatusCodes.OK).json({ data, message: "success" });
    } catch (error) {
      next(error);
    }
  };
}

export default MailerController;
