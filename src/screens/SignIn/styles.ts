import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  padding: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + RFValue(24)}px;
  padding: 0 ${RFValue(8)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.text.title};
  margin-bottom: ${RFValue(16)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Form = styled.View`
  width: 100%;
  margin: ${RFValue(64)}px 0;
`;

export const Footer = styled.View`
  margin-bottom: ${getBottomSpace() + RFValue(32)}px;
`;
