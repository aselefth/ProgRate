import { ICreatePost, IUserLogin, IUserRegister } from "../types/types"

export const loginValidation = ({ userName, password }: IUserLogin) => {
    let res = false

    if (
        userName.trim().length >= 5 &&
        userName.trim().length <= 30 &&
        password.trim().length >= 8 &&
        password.trim().length <= 30
    ) {
        res = true
    }

    return res
}

export const registerValidation = ({
    userName,
    password,
    email,
    fullName,
}: IUserRegister) => {
    let res = false
    const regExpEmail = /[A-Za-z0-9]+@[A-Za-z0-9]+(.[A-z]{2,4}){1,2}/
    const regExpName = /(^[A-Z]{1}[a-z]{2,10}) ([A-Z]{1}[a-z]{2,10})/
    if (
        userName.trim().length >= 5 &&
        userName.trim().length <= 30 &&
        password.trim().length >= 8 &&
        password.trim().length <= 30 && 
        regExpEmail.test(email) &&
        regExpName.test(fullName)
    ) {
        res = true
    }

    return res
}

export const postValidation = (post: ICreatePost) => {
    let res = false
    if (post.plot.length > 2 || post.title.length > 2) {
        res = true
    }

    return res
}
