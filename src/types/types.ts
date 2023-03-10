export interface IUserLogin {
    userName: string
    password: string
}

export interface IUserRegister {
    fullName: string
    email: string
    password: string
    userName: string
}

export interface IUser {
    userName: string
    fullName: string
    email: string
}

export interface ICreatePost {
    title: string
    plot: string
}

export interface IPost {
    postId: number
    title: string
    plot: string
    likes: number
    userId: string
}

export interface IComment {
    commentId: number
    message: string
    postId: number
    userId: string
}

export interface ICreateComment {
    postId: number
    comment: { message: string }
}
