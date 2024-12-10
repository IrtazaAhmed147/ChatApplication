const initialState = {
    user: null,
    isUser: false,
    userDetails: null
}

export const authFunc = (state = initialState, action) => {
    
    switch (action.type) {
        case 'SIGNUP':
           
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
          

            return {
                ...state,
                userDetails: action.payload,
            };




        default: return state

    }
}
