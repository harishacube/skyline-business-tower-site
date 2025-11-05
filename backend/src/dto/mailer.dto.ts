// src/dtos/mailer.dto.ts
export interface SendMailRequestDto {
  name: string;
  company_name?: string;
  email: string;
  phone?: string;
  message?: string;
}

export interface SendMailReponseDto {
  messageId: string;
  accepted: string[]; // list of accepted emails
  rejected: string[]; // list of rejected emails
}
