import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  color?: string;
  size?: 'large' | 'small';
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator.attrs(({ size, color, theme }) => ({
  size: size ? size : 'large',
  color: color ? color : theme.colors.main.default
}))``;

export const Text = styled.Text<Props>`
  font-size: ${({size = 'large'}) => size === 'large' ? RFValue(16) : RFValue(14)}px;
  color: ${({ theme, color }) => color ? color : theme.colors.main.default};
`;