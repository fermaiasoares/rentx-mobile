import React, { useRef, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { 
  ChangePasswordVisibilityButton,
  Container, 
  IconContainer, 
  TextInput 
} from './styles';

interface InputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  iconName: React.ComponentProps<typeof Feather>['name'];
  type?: 'password' | 'default';
}

export function Input({
  iconName,
  type = 'default',
  value,
  ...rest
}: InputProps) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handlePasswordVisibleChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24} 
          color={ (isFilled || isFocused) 
            ? theme.colors.main.default 
            : theme.colors.text.detail 
          } 
        />
      </IconContainer>
      <TextInput
        placeholderTextColor={theme.colors.text.detail}
        secureTextEntry={type === 'password' && !!isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      
      { type === 'password' && 
        <IconContainer>
          <ChangePasswordVisibilityButton
            onPress={handlePasswordVisibleChange}
          >
            <Feather
              name={!!isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text.detail}
              />
          </ChangePasswordVisibilityButton>
        </IconContainer>
      }
    </Container>
  );
}