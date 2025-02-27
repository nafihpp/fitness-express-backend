import jwt from "jsonwebtoken";
import { TokenType } from "../model/user/types";

export const generateToken = (userId: string, role: string, tokenType: TokenType): string => {
    const isToken = tokenType === TokenType.ACCESS;
    const expiration =  isToken ? "5m" : "7d";
    const secretKey = isToken ? process.env.JWT_SECRET : process.env.REFRESH_JWT_SECRET;

  if (!secretKey) {
    throw new Error(`Secret key for ${tokenType} token is missing.`);
  }

  const payload = { id: userId, role };

  return jwt.sign(payload, secretKey, { expiresIn: expiration });
};

export const verifyToken = (token : string, tokenType: TokenType) => {
    if (!token) return false;
    const isToken = tokenType === TokenType.ACCESS;
    const secretKey = isToken ? process.env.JWT_SECRET : process.env.REFRESH_JWT_SECRET;
    const tokenValid = jwt.verify(token,secretKey);
  
    if (!tokenValid) return false;
  
    return tokenValid;
};
  