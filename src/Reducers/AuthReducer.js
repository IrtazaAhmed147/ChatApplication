const initialState = {
    user: null,
    isUser: false,
    userDetails: null
}

export const authFunc = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SIGNUP':
            console.log(action.payload.email)
            return {
                ...state,
                user: action.payload,
            };

        case 'SIGNIN':
            return {
                ...state,
                user: action.payload
            }
        case 'USERCHECK':

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




        default: return state

    }
}
