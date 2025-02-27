export interface IUser extends Document {
  email        : string;
  password     : string;
  role         : RoleEnum;
}

export enum RoleEnum {
    USER  = "user",
    ADMIN = "admin",
}
  
export enum TokenType {
    ACCESS  = "access_token",
    REFRESH = "refresh_token",
  }
  