import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  ScheduleDetails: { car: CarDTO, dates: string[] };
  ScheduleConfirmation: undefined;
}