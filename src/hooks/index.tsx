import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AuthProvider } from './auth';

import theme from '../styles/theme';

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {children} 
      </ThemeProvider>
    </AuthProvider>
  )
}