import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

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

    return <div style={{ padding: 5 }}>
        <h3>Search</h3>
        <input
            placeholder="search for a friends ..."
            className="form-control"
            value={text}
            onChange={e => setText(e.target.value)}
        />

        {users.length > 0 && <small>{users.length} users found</small>}
        <div className="list">
            {
                users.map(user=>
                    <div key={user.id}>
                        <img 
                        src={user.picture? BASE_URL + user.picture : DEFAULT_PIC}
                        />
                        <p>{user.name } {user.surname}</p>
                    </div>
                )
            }
        </div>
    </div>
}