import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

export const register = () => {
    const [emptyForm, setEmptyForm ] = useState(
        {
            name: '',
            email: '',
            password: '',
        }
    )

    const onSignUp = () => {

    }

    return (
        <View>
            <TextInput 
                placeholder="name"
                onChangeText={(name) => setEmptyForm({
                    name: name,
                    email: emptyForm.email,
                    password: emptyForm.password,
                })}
            />
            <TextInput 
                placeholder="email"
                onChangeText={(email) => setEmptyForm({
                    name: emptyForm.name,
                    email: email,
                    password: emptyForm.password,
                })}
            />
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
