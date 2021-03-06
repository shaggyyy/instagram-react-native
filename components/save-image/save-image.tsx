import React, { useState } from 'react'
import { View, Button, TextInput, Image } from 'react-native'

import firebase from 'firebase';
require('firebase/firestore')
require('firebase/firebase-firestore')

export const saveImage = (props) => {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(`post/${firebase.auth().currentUser?.uid}/${Math.random().toString(36)}`)
            .put(blob);

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = () => {
            // task.snapshot.ref.getDownloadURL().then((snapshot) => {
            //     console.log(snapshot)
            // })
        }

        const taskProgress = () => {
            // task.snapshot.ref.getDownloadURL().then((snapshot) => {
            //     console.log(snapshot)
            // })
        }

        task.on("state_changed", taskProgress, taskError ,taskCompleted);
    }

    const savePostData = (downloadUrl: string) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser?.uid)
            .collection('userPosts')
            .add({
                downloadUrl,
                caption,
                creationDate: firebase.firestore.FieldValue.serverTimestamp()
            }).then( (function () {
                props.navigation.popToTop()
            }))
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} style={{flex: 1}}/>
            <TextInput 
                placeholder="Enter Caption"
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button
                title='Save Image'
                onPress={() => uploadImage()}
            />
        </View>
    )
}
