export const signUpAction = (value)=> {
    return {
        type: 'SIGNUP',
        payload: value
    }
}
export const signInUser = (value)=> {
    return {
        type: 'SIGNIN',
        payload: value
    }
}
export const setUserAction = (value)=> {
    return {
        type: 'USERCHECK',
        payload: value
    }
}

