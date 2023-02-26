import { HubConnection } from '@microsoft/signalr'
import { useSendMessageMutation } from '../store/Api/messagesApiSlice'


export async function sendMessage(
    connection: HubConnection,
    message: string,
    userId: string,
    groupName: string
    
) {
    try {
        await connection.invoke(
            'SendToGroup',
            {
                userId,
                groupName,
                message
            }
        )
    } catch (e) {
        console.log(e)
    }
}

export async function joinGroup(connection: HubConnection, group: string) {
    try {
        const res = await connection?.invoke('JoinGroup', group)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export async function logOut(connection: HubConnection, group: string) {
    try {
        await connection?.invoke('Logout', group)
        console.log('out')
    } catch (e) {
        console.log(e)
    }
}
