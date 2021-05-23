import firebase from 'firebase';
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux';

import { store } from '../../App'

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
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Welcome To Feed </Text>
    </View>
  )
}