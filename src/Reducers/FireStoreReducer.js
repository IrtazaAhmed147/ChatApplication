const initialState = {
    friendRequestList: [],
    friends: [],
    theme: ''
}

export const fireStoreFunc = (state = initialState, action) => {
    
    switch (action.type) {
        case 'REQUESTLIST': return {
            ...state, 
            friendRequestList: action.payload
        }
            case 'FILTERREQUESTLIST' : return {
                ...state, 
                friendRequestList : state.friendRequestList.filter((find)=> find.id !== action.payload)
                
            }   
            case 'ISUSERFRIEND' : return {
                ...state,
                friends: action.payload
            } 
            case 'THEME' : return {
                ...state,

                theme: action.payload
            }
  
    
        default: return state
       
    }
}
