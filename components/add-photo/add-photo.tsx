import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export const addPhoto = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null || hasGalleryPermission === false) {
        return (
            <View>
            </View>
        )
    }

    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return (
            <View>
                <Text>No access to camera</Text>
            </View>
        )
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const saveImage = () => {
        navigation.navigate('save-image', {image});
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} />
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
            />
            <Button
                title='Pick Picture from Galllery'
                onPress={() => pickImage()}
            />
             <Button
                title='save Picture'
                onPress={() => saveImage()}
            />
            { image && <Image source={{ uri: image }} style={styles.clickedImage} />}
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