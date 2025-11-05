import { IsEmail, IsDefined, MinLength } from "class-validator";
import { Trim } from "class-sanitizer";

export class SendMailRequestDto {
  @IsDefined()
  @Trim()
  @MinLength(1, { message: "Name should be minimum of 1 character(s)" })
  public name!: string;

  @IsDefined()
  @Trim()
  @MinLength(1, { message: "Name should be minimum of 1 character(s)" })
  public company_name!: string;

  @IsDefined()
  @IsEmail({}, { message: "Email is not valid" })
  @Trim()
  public email!: string;

  @IsDefined()
  @Trim()
  public phone!: string;

  @IsDefined()
  @Trim()
  @MinLength(1, { message: "lookingfor is not valid" })
  public lookingfor!: string;

  public message!: string;
}

export class SendMailReponseDto {}
