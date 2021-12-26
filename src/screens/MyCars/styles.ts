import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';

import { CarProps } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.header};
  justify-content: center;
  padding: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + RFValue(25)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.shape.default};
  margin-top: ${RFValue(24)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.shape.default};
  margin-top: ${RFValue(24)}px;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background.primary};
  padding: 0 ${RFValue(16)}px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(24)}px 0;
`;

export const AppointmentsTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const AppointmentsQuantity = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const AppointmentsList = styled(
  FlatList as new (props: FlatListProps<CarProps>
) => FlatList<CarProps>).attrs({
  contentContainerStyle: {
    paddingBottom: RFValue(24),
  },
  showsVerticalScrollIndicator: false,
})``;

export const CarWrapper = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.background.secondary};
  margin-bottom: ${RFValue(24)}px;
`;

export const CarFooter = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top-width: ${RFValue(4)}px;
  border-top-color: ${({theme}) => theme.colors.background.primary};
  padding: ${RFValue(16)}px ${RFValue(24)}px;
`;

export const CarFooterTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text.default};
`;
