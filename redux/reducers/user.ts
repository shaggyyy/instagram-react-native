import { USER_FOLLOWING_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_SELECTED_STATE_CHANGE, USER_STATE_CHANGE } from "../constants"

const initialState = {
    currentUser: null,
    selectedUser: null,
    posts: [],
    followingUsers: []
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_SELECTED_STATE_CHANGE:
            return {
                ...state,
                selectedUser: action.selectedUser
            }
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts
            }
        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                followingUsers: action.users
            }
        default:
            return state
    }
}