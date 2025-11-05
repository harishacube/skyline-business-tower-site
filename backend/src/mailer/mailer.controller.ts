import { ExtendedRequest, ExtendedResponse } from "../common/express";
import * as service from "./mailer.service";
import * as dto from "./dto";

export async function sendmail(req: ExtendedRequest, res: ExtendedResponse) {
  const serviceRequest: dto.SendMailRequestDto = req.body;
  console.log("serviceRequest", serviceRequest);
  const resp = await service.sendmail(serviceRequest);
  res.ok(resp);
}
