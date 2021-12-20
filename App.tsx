import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

import theme from './src/styles/theme';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}