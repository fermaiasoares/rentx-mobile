import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: ${RFPercentage(15)}px;
  height: ${RFValue(92)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text.default};
`;