import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"
import { Link } from "react-router-dom"

export const Search = () => {
    const [users, SetUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if (!text.trim()) {
            SetUsers([])
        } else {
            handleSearch(text)
                .then(response => {
                    console.log(response);
                    SetUsers(response.payload as IUser[])
                })
        }
    }, [text])

    return (
        <div className="search-container">
            <h3>Search</h3>
            <input
                placeholder="Search for a friend..."
                className="search-input"
                value={text}
                onChange={e => setText(e.target.value)}
            />

            {users.length > 0 && <small>{users.length} users found</small>}

            <div className="list">
                {
                    users.map(user =>
                        <div key={user.id}>
                            <Link to={`/profile/${user.id}`}>
                                <img
                                    src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC}
                                />
                                <p>{user.name} {user.surname}</p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
