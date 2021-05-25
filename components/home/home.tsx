import firebase from 'firebase';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { feed } from '../feed/feed';
import { profile } from '../profile/profile';
import { addPhoto } from '../add-photo/add-photo';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator initialRouteName="feed">
      <Tab.Screen name="feed" component={feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen name="empty-screen" component={emptyScreen}
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
      <Tab.Screen name="profle" component={profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}