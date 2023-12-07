import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../screens/HomeScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import OutgoingCallScreen from '../screens/OutgoingCallScreen';
import CallRoomScreen from '../screens/CallRoomScreen';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} />
        <Stack.Screen name="OutgoingCallScreen" component={OutgoingCallScreen} />
        <Stack.Screen name="CallRoomScreen" component={CallRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
