import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { handleLogout, handleVerify } from "../../lib/api"
import { IWedeUser } from "../../lib/types"
import { NavLink } from "./NavLink"

export const Profile = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<IWedeUser | null>()
    useEffect(() => {
        handleVerify()
            .then(response => {
                if (!response.user) {
                    navigate("/login")
                } else {
                    setAccount(response.user)
                }
            })
    }, [])

    const logout = () => {
        handleLogout()
            .then(response => {
                navigate("/login")
            })
    }

    return account && <>
        <nav>
            <NavLink to="/profile" end>Profile</NavLink>
            <NavLink to="/profile/settings" end>Settings</NavLink>
            <NavLink to="/profile/search" end>Search</NavLink>
            <NavLink to="/profile/posts" end>Posts</NavLink>
            <NavLink to="/profile/followers" end>Followers</NavLink>
            <NavLink to="/profile/followings" end>Followings</NavLink>
            {account.isPrivate ? (
                <NavLink to="/profile/requests" end>Requests</NavLink>
            ) : null}
            <button onClick={() => logout()}>Logout</button>
        </nav>

        <Outlet
            context={{ account, setAccount }}
        />
    </>
}