import { CarDTO, ConfirmationDTO, UserDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  ScheduleDetails: { car: CarDTO, dates: string[] };
  Confirmation: ConfirmationDTO;
  MyCars: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDTO};
}