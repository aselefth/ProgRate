import { IUserLogin, IUserRegister } from "../types/types"

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
    if (
        userName.trim().length >= 5 &&
        userName.trim().length <= 30 &&
        password.trim().length >= 8 &&
        password.trim().length <= 30 && 
        /[A-Za-z0-9]+@[A-Za-z0-9]+(.[A-z]{2,4}){1,2}/.test(email) &&
        /(^[A-Z]{1}[a-z]{2,10}) ([A-Z]{1}[a-z]{2,10})/.test(fullName)
    ) {
        res = true
    }

    return res
}