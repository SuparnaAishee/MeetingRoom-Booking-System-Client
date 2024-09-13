/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
interface JwtPayload {
  userEmail: string;
  role: string;
  name: string; // Add name
  address: string; // Add address
  phone: string; // Add phone
  exp: number;
  iat: number;
}

export const verifyToken = (token: any) => {
  return jwtDecode<JwtPayload>(token);
};
