import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

import firebase from 'firebase/app'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Landing } from './components/authentication/landing';
import { register } from './components/register/register';
import { Login } from './components/login/login';
import { Home } from './components/home/home'
import { addPhoto } from './components/add-photo/add-photo';
import { saveImage } from './components/save-image/save-image';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyCiNshI_QxsVLHEmdODOnCWifo1WW_deZc",
  authDomain: "instgram-clone-react-native.firebaseapp.com",
  projectId: "instgram-clone-react-native",
  storageBucket: "instgram-clone-react-native.appspot.com",
  messagingSenderId: "725116981205",
  appId: "1:725116981205:web:67b0867bbb3f3e16b1f75c",
  measurementId: "G-BBQ86DN0CT"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [userAuthState, setUserAuthState] = useState({
    loaded: false,
    loggedIn: false,
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setUserAuthState({
          loaded: true,
          loggedIn: false
        })
      } else {
        setUserAuthState({
          loaded: true,
          loggedIn: true
        })
      }
    })
  })

  return (
    <>
      { !userAuthState.loaded &&
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      }

      { (!userAuthState.loggedIn && userAuthState.loaded) &&
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="register" component={register} />
            <Stack.Screen name="login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      }

      { (userAuthState.loggedIn) &&
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen name="home" component={Home} options={{ headerShown: true }} />
              <Stack.Screen name="add-photo" component={addPhoto} />
              <Stack.Screen name="save-image" component={saveImage} options={{ headerShown: true }} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      }
    </>
  );
}