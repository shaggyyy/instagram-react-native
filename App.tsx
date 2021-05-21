import React from 'react';

import firebase from 'firebase/app'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Landing} from './components/authentication/landing';
import {register} from './components/register/register';

const firebaseConfig = {
  apiKey: "AIzaSyCiNshI_QxsVLHEmdODOnCWifo1WW_deZc",
  authDomain: "instgram-clone-react-native.firebaseapp.com",
  projectId: "instgram-clone-react-native",
  storageBucket: "instgram-clone-react-native.appspot.com",
  messagingSenderId: "725116981205",
  appId: "1:725116981205:web:67b0867bbb3f3e16b1f75c",
  measurementId: "G-BBQ86DN0CT"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false}}/>
          <Stack.Screen name="register" component={register}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}