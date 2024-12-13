export const requestFunction = async()=>{
    const permission = await Notification.requestPermission()
    if(permission === 'granted') {
            console.log('granted')
    } else if(permission === 'denied') {
        console.log('you denied notification')
    }
    
}