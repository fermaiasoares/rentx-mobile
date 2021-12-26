import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps extends RectButtonProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: ${RFValue(19)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({enabled}) => enabled ? 1 : 0.5};
  background-color: ${({ color, theme }) => color ? color : theme.colors.main.default};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.shape.default};
`;