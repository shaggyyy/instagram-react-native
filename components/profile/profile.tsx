import React, { useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { useDispatch } from 'react-redux';

import { store } from '../../App';

export const profile = (props) => {
    const dispatch = useDispatch()
    const state = store.getState()
    const currentUser = state.userState.currentUser
    const userPosts = state.userState.posts

    useEffect(() => {

    }, [dispatch]);

    return (
        <View style={styles.container}>
            <View style={styles.containerUserInfo}>
                <Text>{currentUser?.name}</Text>
                <Text>{currentUser?.email}</Text>
            </View>

            <View style={styles.postContainer}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={styles.imageContainer}
                            >
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadUrl }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    containerUserInfo: {
        margin: 20,
    },
    postContainer: {
        flex: 1,
    },
    imageContainer: {
        flex: 1 / 3,
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
    }
})
