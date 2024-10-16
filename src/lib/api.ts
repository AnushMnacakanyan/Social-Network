import axios from "axios";
import { InputUser, IResponse, IUpdateLogin, IUpdatePassword } from "./types";

const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})

export const handelSignup = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post("/signup", user)

    return response.data
}

export const handleLogin = async (obj: { login: string, password: string }): Promise<IResponse> => {
    const response = await Axios.post("/login", obj)
    return response.data
}

export const handleVerify = async (): Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data
}

export const handleLogout = async (): Promise<IResponse> => {
    const response = await Axios.post("/logout")
    return response.data
}

export const handleUpdatePassword = async (password: IUpdatePassword): Promise<IResponse> => {
    const response = await Axios.patch("/update/password", password)
    return response.data
}

export const handleUpdateLogin = async (login: IUpdateLogin): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", login)
    return response.data
}

export const handlePictureUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", data)
    return response.data

}

export const handleCoverUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload", data)
    return response.data
}

export const handleGetPosts = async (): Promise<IResponse> => {
    const response = await Axios.get("/posts")
    return response.data
}

export const handlePostCreation = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.post("/posts", data)
    return response.data
}

export const handleSearch = async (text: string): Promise<IResponse> => {
    const response = await Axios.get("search/" + text)
    return response.data
}

export const handleIsPrivate = async (): Promise<IResponse> => {
    const response = await Axios.patch("account/set")
    return response.data
}

export const handleAccound = async (id: string | undefined): Promise<IResponse> => {
    const response = await Axios.get("account/" + id)
    return response.data
}

export const handleSendFollow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/account/follow/' + id)
    return response.data
}


export const handleUnfollow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/account/unfollow/' + id)
    return response.data
}

export const handleCancelRequest = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete('/request/cancel/' + id)
    return response.data
}

export const handleAcceptRequest = async (id: number | undefined): Promise<IResponse> => {
    const response = await Axios.patch('/requests/accept/' + id)
    return response.data
}


export const handleDeclineRequest = async (id: number | undefined): Promise<IResponse> => {
    const response = await Axios.patch('/requests/decline/' + id)
    return response.data
}

export const handleGetRequest = async (): Promise<IResponse> => {
    const response = await Axios.get('/requests')
    return response.data
}

export const handlePostReaction = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/posts/react/' + id)
    return response.data
}

export const handleGetPostId = async (id: number): Promise<IResponse> => {
    const response = await Axios.get('/posts/' + id)
    return response.data
}

export const handleBlock = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/block/' + id)
    return response.data
}

export const handleDeletePost = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete("/posts/" + id)
    return response.data
}

export const handleComment = async (id: number, text: string): Promise<IResponse> => {
    const response = await Axios.post("/posts/comment/" + id, { text })
    return response.data
}

export const handleDeleteComment = async (id: number): Promise<IResponse> => {
    const resopnse = await Axios.delete("/posts/comment/" + id)
    return resopnse.data
}

export const handleGetFollowers = async (): Promise<IResponse> => {
    const response = await Axios.get("/followers")
    return response.data
}

export const handleFollowings = async (): Promise<IResponse> => {
    const response = await Axios.get("/following")
    return response.data
}