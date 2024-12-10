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