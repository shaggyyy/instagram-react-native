import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'

import firebase from 'firebase';
require('firebase/firestore')

export const search = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = (searchString: string) => {
        firebase.firestore()
            .collection('user')
            .where('name', '>=', searchString)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users)
            })
        console.log(users)
    }

    useEffect(() => {

    }, [])

    return (
        <View>
            <TextInput placeholder="search" onChangeText={(search) => fetchUsers(search)} />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => {
                    return (
                        <Text>{item.name}</Text>
                    )
                }}
            />
        </View>
    )
}
