import { ChangeEvent, useState } from "react"

export function useImage () {

    const [avatar, setAvatar] = useState('')

    async function handleSetAvatar(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0]
        const base64 = file && (await convertBase64(file))
        setAvatar(String(base64))
    }

    function convertBase64(file: File | Blob): Promise<string> {
        return new Promise((res, rej) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                res(fileReader.result as string)
            }

            fileReader.onerror = (err) => {
                rej(err)
            }
        })
    }

    return {avatar, handleSetAvatar, setAvatar}
}