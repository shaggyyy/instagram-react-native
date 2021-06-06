import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, Button } from 'react-native'

import firebase from 'firebase'
import { store } from '../../App'
import { useDispatch } from 'react-redux'
import { USER_FOLLOWING_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from '../../redux/constants'
require('firebase/firestore')

export const profile = (props) => {
    const [following, setFollowing] = useState(false)

    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [followingUsers, setFollowingUsers] = useState([])

    const dispatch = useDispatch()

    const fetchUser = () => {
        firebase.firestore()
            .collection('user')
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, user })
                    setUser(snapshot.data())
                } else {
                    console.log('does not exist')
                }
            })

    }

    const fetchUserPosts = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .orderBy('creationDate', 'asc')
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
                setUserPosts(posts)
            })
    }

    const fetchFollowingUser = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser?.uid)
            .collection('userFollowing')
            .onSnapshot((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const id = doc.id;
                    return id
                })
                if (JSON.stringify(users) !== JSON.stringify(followingUsers)) {
                    dispatch({ type: USER_FOLLOWING_STATE_CHANGE, users })
                    setFollowingUsers(users)
                }
            })
    }

    useEffect(() => {
        fetchUser();
        fetchUserPosts();
        fetchFollowingUser()
        checkIfUserFollowing()
    }, [props.route.params.uid, followingUsers]);

    const onFollow = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser?.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .set({})
    }

    const onUnfollow = () => {
        firebase.firestore()
            .collection('following')
            .doc(firebase.auth().currentUser?.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .delete()
    }

    const checkIfUserFollowing = () => {
        const followingUsers = store.getState().userState.followingUsers;
        if (props.route.params.uid !== firebase.auth().currentUser?.uid) {
            if (followingUsers.includes(props.route.params.uid)) {
                setFollowing(true)
            } else {
                setFollowing(false)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerUserInfo}>
                <Text>Profile</Text>
                <Text>{user?.name}</Text>
                <Text>{user?.email}</Text>

                {props.route.params.uid !== firebase.auth().currentUser?.uid ? (
                    <View>
                        { following ? (
                            <Button
                                title="UnFollow"
                                onPress={() => onUnfollow()}
                            />
                        ) : (
                            <Button
                                title="Follow"
                                onPress={() => onFollow()}
                            />
                        )}
                    </View>
                ) : null}
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
