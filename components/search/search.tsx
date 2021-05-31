import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase';
require('firebase/firestore')

export const search = ({ navigation }) => {
    const [users, setUsers] = useState([])

    const fetchUsers = (searchString: string) => {
        firebase.firestore()
            .collection('user')
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                users = users.filter(user => user.name.startsWith(searchString))
                setUsers(users)
            })
    }

    return (
        <View>
            <TextInput placeholder="search" onChangeText={(search) => fetchUsers(search)} />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile', { uid: item.id })}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    )
}
