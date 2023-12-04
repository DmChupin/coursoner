export interface UserInterface {
  email: string;
  token: string;
  username: string;
}

export interface UserRegisterInterface {
  email: string;
  password: string;
  username: string;
}

export interface UserAuthenticateInterface {
  email: string;
  password: string;
}
