import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  margin-top: ${getStatusBarHeight() + RFValue(18)}px;
  margin-left: ${RFValue(24)}px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + RFValue(32)}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: RFValue(16),
    alignItems: 'center'
  },
  showsVerticalScrollIndicator: false
})``;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(38)}px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text.detail}
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text.detail};
  text-align: right;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main.default};
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(16)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  padding-bottom: ${RFValue(16)}px;
`;

export const CalendarIcon = styled.View`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  background-color: ${({ theme }) => theme.colors.main.default}
  align-items: center;
  justify-content: center;
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text.detail};
  text-transform: uppercase;
`;

export const DateValue = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text.title};
  text-transform: uppercase;
`;

export const Acessories = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin-top: ${RFValue(16)}px;
`;

export const RentalPrice = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px;
`;

export const RentalPriceLable = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text.detail};
  text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RentalPriceQuota = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text.title};
`;

export const RentalPriceTotal = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main.success};
`;


export const Footer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${RFValue(8)}px ${RFValue(8)}px ${getBottomSpace() + RFValue(8)}px;
`;