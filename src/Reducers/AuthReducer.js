const initialState = {
    user: null,
    isUser: false
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
            case 'USERCHECK' :
                console.log('checkUserworking')
                
                    return {
                        ...state,
                        isUser: action.payload,
                    };
               
                


        default: return state.user

    }
}