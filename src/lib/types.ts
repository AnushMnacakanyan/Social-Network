export interface IUser {
    id: string
    name: string
    surname: string
    login: string
    password: string
    isPrivate: boolean
    cover: string
    picture: string
}

export type InputUser = Omit<IUser, "id" | "isPrivate" | "cover" | "picture">

export type InputLogin = Omit<IUser, "id" | "name" | "surname" | "isPrivate" | "cover" | "picture">

export interface IResponse {
    status: string
    message?: string
    payload?: unknown
    user?: IWedeUser
}

export interface IWedeUser extends IUser {
    followers: IUser[]
    following: IUser[]
}

export interface IContextType {
    account: IWedeUser
    setAccount: (user: IWedeUser) => void
}

export interface IUpdatePassword {
    old: string
    newpwd: string
}

export interface IUpdateLogin{
    password:string
    login:string
}

export interface IPost{
    id:number
    title:string
    picture:string
}

export interface IAccount extends IUser{
    conection:{
        blockedMe:boolean
        didIBlock:boolean
        following:boolean
        followsMe:boolean
    },
    posts:IPost[] | undefined
}