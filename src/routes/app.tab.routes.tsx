import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';

import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';
import HomeSvg from '../assets/home.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: theme.colors.main.default,
        tabBarInactiveTintColor: theme.colors.text.detail,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          height: 78,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen 
        name='Home'
        component={AppStackRoutes} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeSvg width={size} height={size} fill={color}/>
          )
        }}
      />

      <Screen 
        name='MyCars' 
        component={MyCars} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <CarSvg width={size} height={size} fill={color}/>
          )
        }}
      />

      <Screen 
        name='Profile' 
        component={Home} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <PeopleSvg width={size} height={size} fill={color} />
          )
        }}
      />
    </Navigator>
  );
}