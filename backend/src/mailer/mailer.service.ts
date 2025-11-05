import * as dto from "./dto";
import { transporter } from "../utils/node-mailer";
import Mail from "nodemailer/lib/mailer";

export async function sendmail(
  serviceRequest: dto.SendMailRequestDto
): Promise<dto.SendMailReponseDto | null> {
  console.log(serviceRequest);
  const mailOptions = <Mail.Options>{
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "New Inquiry from ACube Marketing Site: " + serviceRequest.name,
    html:
      "<p>Name: " +
      serviceRequest.name +
      "</p><p>Company Name: " +
      (serviceRequest.company_name ? serviceRequest.company_name : "") +
      "</p><p>Email: " +
      serviceRequest.email +
      "</p><p>Phone Number: " +
      (serviceRequest.phone ? serviceRequest.phone : "") +
      "</p><p>Looking For: " +
      (serviceRequest.lookingfor ? serviceRequest.lookingfor : "") +
      "</p><p>Message: " +
      (serviceRequest.message ? serviceRequest.message : "") +
      "</p>",
  };
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
  return {};
}
