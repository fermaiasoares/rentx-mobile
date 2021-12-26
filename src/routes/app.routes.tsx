import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { ScheduleConfirmation } from '../screens/ScheduleConfirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Splash'
    >
      <Screen name='Splash' component={Splash} />
      <Screen name='Home' component={Home} options={{
        gestureEnabled: false,
      }}/>
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='ScheduleConfirmation' component={ScheduleConfirmation} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  );
}