import firebase from 'firebase';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { feed } from '../feed/feed';
import { profile } from '../profile/profile';
import { addPhoto } from '../add-photo/add-photo';
import { View } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

const emptyScreen = () => {
  return (null)
}

export const Home = () => {
  const dispatch = useDispatch();

  const fetchUser = () => {
    firebase.firestore()
      .collection('user')
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: 'USER_STATE_CHANGE', currentUser: snapshot.data() })
        } else {
          console.log('does not exist')
        }
      })

  }

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  return (
    <Tab.Navigator initialRouteName="feed" labeled={false}>
      <Tab.Screen name="Feed" component={feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen name="Add Photo" component={emptyScreen}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('add-photo');
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}