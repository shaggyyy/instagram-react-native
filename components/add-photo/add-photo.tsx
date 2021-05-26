import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export const addPhoto = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState('')
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if(camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type}  ratio={'1:1'} />
            </View>

            <Button
                title='Flip Image'
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}>
            </Button>

            <Button 
                title='take Picture'
                onPress={() => takePicture()}
            />.
            { image && <Image source={{uri: image}}  style={styles.clickedImage}/> }
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    camera: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
    },
    clickedImage: {
        flex: 1,
    }
});