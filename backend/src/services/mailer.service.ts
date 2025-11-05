import * as dto from "../dto/mailer.dto";
import { transporter } from "@/utils/node-mailer";
import Mail from "nodemailer/lib/mailer";

class MailerService {
  public async sendmail(serviceRequest: dto.SendMailRequestDto): Promise<dto.SendMailReponseDto> {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: `New Inquiry from Skyline Business: ${serviceRequest.name}`,
        html: `
          <p><b>Name:</b> ${serviceRequest.name}</p>
          <p><b>Company Name:</b> ${serviceRequest.company_name ?? ""}</p>
          <p><b>Email:</b> ${serviceRequest.email}</p>
          <p><b>Phone Number:</b> ${serviceRequest.phone ?? ""}</p>
          <p><b>Message:</b> ${serviceRequest.message ?? ""}</p>
        `,
      };

      const info = await transporter.sendMail(mailOptions);

      return {
        messageId: info.messageId,
        accepted: info.accepted.map((r) => (typeof r === "string" ? r : r.address)),
        rejected: info.rejected.map((r) => (typeof r === "string" ? r : r.address)),
      };
    } catch (error: any) {
      throw new Error(`Failed to send mail: ${error.message}`);
    }
  }
}

export default MailerService;
