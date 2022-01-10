import { RootStackParamList } from '../routes/paramList';
interface Rent {
  period: string;
  price: number;
}

interface Accessory {
  type: string;
  name: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: string[];
}

export interface UserDTO {
  name: string;
  email: string;
  driverLicense: string;
  password?: string;
  password_confirmation?: string;
}

export interface ConfirmationDTO {
  title: string;
  message: string;
  nextScreenRoute?: keyof RootStackParamList;
}