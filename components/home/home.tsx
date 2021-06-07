import firebase from 'firebase';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { feed } from '../feed/feed';
import { profile } from '../profile/profile';
import { store } from '../../App';
import { search } from '../search/search';
import { USER_FOLLOWING_STATE_CHANGE, USER_STATE_CHANGE } from '../../redux/constants';

const Tab = createMaterialBottomTabNavigator();

const emptyScreen = () => {
  return (null)
}

export const Home = () => {
  const dispatch = useDispatch()

    const fetchUser = () => {
        firebase.firestore()
            .collection('user')
            .doc(firebase.auth().currentUser?.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const user = snapshot.data()
                    dispatch({ type: USER_STATE_CHANGE, currentUser: user })
                    setUser(snapshot.data())
                } else {
                    console.log('does not exist')
                }
            })
    }

    useEffect(() => {
        fetchUser();
    }, [dispatch]);

 
  return (
    <Provider store={store}>
      <Tab.Navigator initialRouteName="feed" labeled={false}>
        <Tab.Screen name="Feed" component={feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Search" component={search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
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
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('Profile', { uid: firebase.auth().currentUser?.uid });
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </Provider>
  )
}