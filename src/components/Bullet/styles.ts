import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ImageIndexProps {
  actived: boolean;
}

export const Container = styled.View<ImageIndexProps>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;
  background-color: ${({ theme, actived }) => 
    actived ? theme.colors.text.title : theme.colors.shape.default};
  border-radius: ${RFValue(3)}px;
  margin-left: ${RFValue(8)}px;
`;