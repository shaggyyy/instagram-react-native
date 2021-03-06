import React from 'react'
import { Text, View, Button } from 'react-native'

export const Landing = ({ navigation }) : JSX.Element => {
    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Button
                title="Register"
                onPress={() => navigation.navigate("register")}
            >
            </Button>
            <Button
                title="Login"
                onPress={() => navigation.navigate("login")}
            >
            </Button>
        </View>
    )
}

