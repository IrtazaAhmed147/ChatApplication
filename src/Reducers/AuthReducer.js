const initialState = {
    user: null,
    isUser: false,
    userDetails: null
}

export const authFunc = (state = initialState, action) => {

    switch (action.type) {
        case 'SIGNUP':
            console.log('working')
            console.log(action.payload.email)
            return {
                ...state,
                user: action.payload,
            };

        case 'SIGNIN':
            console.log('loggingin')
            return {
                ...state,
                user: action.payload
            }
        case 'USERCHECK':
            console.log('checkUserworking')

            return {
                ...state,
                isUser: action.payload,
            };
        case 'DEMOUSER':
            console.log('checkUserdemoworking')
            console.log(action.payload)

            return {
                ...state,
                userDetails: action.payload,
            };




        default: return state.user

    }
}