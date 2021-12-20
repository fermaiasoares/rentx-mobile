import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: ${getStatusBarHeight() + RFValue(46)}px;
  padding-bottom: ${getBottomSpace() + RFValue(46)}px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${RFValue(80)}px;
`;

export const ScheduleInfoTitle = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape.default};
`;

export const ScheduleInfoText = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: center;
`;

export const Button = styled(RectButton)`
  width: ${RFValue(80)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.shape.dark};
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape.default};
`;

export const Footer = styled.View`
  align-items: center;
  justify-content: center;
`;