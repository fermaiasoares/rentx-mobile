import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background.secondary};
`;

export const Header = styled.View`
  width: 100%;
  /* height: ${RFValue(325)}px; */
  background-color: ${({theme}) => theme.colors.header};
  justify-content: center;
  padding: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + RFValue(25)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(34)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.shape.default};
  margin-top: ${RFValue(24)}px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(35)}px;
`;

export const DateInfo = styled.View`
  width: 40%;
`;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text.default};
`;

export const DateValue = styled.Text<DateValueProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.shape.default};
  padding-bottom: ${RFValue(5)}px;

  ${({ selected, theme }) => !selected && css`
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${theme.colors.text.default};
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: RFValue(25),
  },
  showsVerticalScrollIndicator: false,
})`
`;

export const Footer = styled.View`
  padding: ${RFValue(24)}px;
`;
