const initialState = {
    friendRequestList: []
}

export const fireStoreFunc = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'REQUESTLIST': return {
            ...state, 
            friendRequestList: action.payload
        }
            case 'FILTERREQUESTLIST' : return {
                ...state, 
                friendRequestList : state.friendRequestList.filter((find)=> find.id !== action.payload)
                
            }    
  
    
        default: return state
       
    }
}
