import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        { user.id ? <AppTabRoutes /> : <AuthRoutes /> }
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}