export const isOnline = ()=> {
    return navigator.onLine
}

export const networkListener = (onOnline, onOffline)=> {
    window.addEventListener('online', onOnline) 
    window.addEventListener('offline', onOffline) 
    
    return ()=>{
        window.removeEventListener('online', onOnline) 
        window.removeEventListener('offline', onOffline) 

    }
}