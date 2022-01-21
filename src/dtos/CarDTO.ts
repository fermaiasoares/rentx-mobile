import { RootStackParamList } from '../routes/paramList';

interface Accessory {
  id: string;
  type: string;
  name: string;
}

interface Photo {
  id: string;
  photo: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: Photo[];
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