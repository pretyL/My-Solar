type User = {
  id: string;
  phoneNumber: string;
  pin: string;
  fullName: string;
  birthDate: string;
  rentedShipsHistory: string[];
};

type UserSignIn = {
  phoneNumber: User['phoneNumber'];
  pin: User['pin'];
};

type UserSignUp = {
  phoneNumber: User['phoneNumber'];
  pin: User['pin'];
  fullName: User['fullName'];
  birthDate: User['birthDate'];
};



export type { User, UserSignIn, UserSignUp };

