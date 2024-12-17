export const requestList = (value)=> {
    return {
        type: 'REQUESTLIST',
        payload: value
    }
}
export const filterRequestList = (value)=> {
    return {
        type: 'FILTERREQUESTLIST',
        payload: value
    }
}

export const isUserFriend = (value)=> {
    return {
        type: 'ISUSERFRIEND',
        payload: value
    }
}

export const themeAction = (value)=> {
    return {
        type: 'THEME',
        payload: value
    }
}