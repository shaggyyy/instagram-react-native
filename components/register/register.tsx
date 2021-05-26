import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import firebase from 'firebase'

export const register = () => {
    const [emptyForm, setEmptyForm ] = useState(
        {
            name: '',
            email: '',
            password: '',
        }
    )

    const onSignUp = () => {
        const { name, email, password } = emptyForm;
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then((result) => {
            firebase.firestore().collection("user")
            .doc(firebase.auth().currentUser?.uid)
            .set({
                name,
                email
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <View>
            <Text>Enter Your Name</Text>
            <TextInput 
                placeholder="name"
                onChangeText={(name) => setEmptyForm({
                    name: name,
                    email: emptyForm.email,
                    password: emptyForm.password,
                })}
            />
            <Text>Enter Your Email</Text>
            <TextInput 
                placeholder="email"
                onChangeText={(email) => setEmptyForm({
                    name: emptyForm.name,
                    email: email,
                    password: emptyForm.password,
                })}
            />
            <Text>Enter Your Password</Text>
            <TextInput 
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => setEmptyForm({
                    name: emptyForm.name,
                    email: emptyForm.email,
                    password: password,
                })}
            />

            <Button 
                title="SignUp"
                onPress={() => onSignUp()}
            />
        </View>
    )
}
