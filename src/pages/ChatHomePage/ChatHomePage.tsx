import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useCreateGroupMutation,
    useGetGroupsQuery,
} from '../../store/Api/groupsApiSlice'

export default function ChatHomePage() {
    const groupName = useRef<HTMLInputElement>(null)
    const { data: chats } = useGetGroupsQuery(undefined)
    const navigate = useNavigate()
    const [createChat] = useCreateGroupMutation()

    async function handleCreateChat(groupName: string) {
        try {
            const res = await createChat(groupName)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <section className="flex flex-col gap-2">
                <div>
                    <label>название беседы</label>
                    <input
                        type="text"
                        ref={groupName}
                    />
                </div>
                <div
                    onClick={() => handleCreateChat(String(groupName?.current?.value))}
                    className="flex items-center px-4 py-2 bg-blue-300 shadow-md justify-center cursor-pointer"
                >
                    <FontAwesomeIcon icon={faEnvelopesBulk} />
                    <span>создать</span>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                {chats?.map((chat: {id: number, groupName: string}) => (
                    <div
                        className="flex items-center justify-center p-4 bg-blue-300 shadow-md cursor-pointer"
                        key={Math.random()}
                        onClick={() => navigate(`/messages/${chat.groupName}`)}
                    >
                        {chat.groupName}
                    </div>
                ))}
            </section>
        </div>
    )
}
