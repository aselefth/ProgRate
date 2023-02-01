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

export interface IUserUpdate {
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

export interface IFriendRequest {
    issuer_id: string
    request_id: number
    target_id: string
}


export interface IFriend {
    email: string
    fullName: string
    userId: string
    userName: string
}