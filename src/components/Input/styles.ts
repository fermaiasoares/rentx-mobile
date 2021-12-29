import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View<Props>`
  margin-bottom: ${RFValue(8)}px;
  flex-direction: row;
  align-items: center;
  border-width: ${RFValue(2)}px;
  border-color: transparent;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${isFocused && theme.colors.main.default };
  `}
`;

export const IconContainer = styled.View`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: ${RFValue(16)}px;
  margin-left: ${RFValue(4)}px;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text.default};
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;
`;
