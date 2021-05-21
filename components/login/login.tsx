import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import firebase from 'firebase'

export const Login = () => {
    const [emptyForm, setEmptyForm ] = useState(
        {
            email: '',
            password: '',
        }
    )

    const onSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(emptyForm.email, emptyForm.password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <View>
            <Text>Enter Your Email</Text>
            <TextInput 
                placeholder="email"
                onChangeText={(email) => setEmptyForm({
                    email: email,
                    password: emptyForm.password,
                })}
            />
            <Text>Enter Your Password</Text>
            <TextInput 
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => setEmptyForm({
                    email: emptyForm.email,
                    password: password,
                })}
            />

            <Button 
                title="Sign In"
                onPress={() => onSignIn()}
            />
        </View>
    )
}
