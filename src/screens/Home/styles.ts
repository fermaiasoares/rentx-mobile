import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

import { Car } from '../../database/models/Car';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: ${RFValue(32)}px ${RFValue(24)}px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<Car>) => FlatList<Car>
)
.attrs({
  contentContainerStyle: {
    padding: RFValue(24),
  },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarButton = styled(RectButton).attrs({
  elevation: 8,
})`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
  background-color: ${({ theme }) => theme.colors.main.default};

  position: absolute;
  bottom: ${RFValue(13)}px;
  right: ${RFValue(22)}px;

  align-items: center;
  justify-content: center;
`;