import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user, loading } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        { !loading && user.id ? <AppTabRoutes /> : <AuthRoutes /> }
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}