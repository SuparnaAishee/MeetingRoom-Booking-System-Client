

// Define the structure of a user object
export interface TUser {
  refreshToken: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  
  _id: string;
 
  email: string;
  role: string;
  name?: string;
  address?: string;
  phone?: string;
  isFirstBooking?:boolean
}
// Define the structure for the signup payload
export interface TSignupPayload {
  name: string;
  email: string;
  phone: string;  // Add phone number
  address: string; // Add address
  password: string;
}


// Define the structure of the login credentials
export interface TLoginUser {
  email: string;   
  password: string;
}

export interface IAuthState {
  user: TUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: TUser;
  token: string;
}
