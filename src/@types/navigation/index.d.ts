import { RootStackParamList } from "../../routes/paramList";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}