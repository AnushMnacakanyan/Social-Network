import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleFollowings } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Followings = () => {
    const [followings, setFollowings] = useState<IUser[]>([])

    useEffect(() => {
        handleFollowings()
            .then(response => {
                setFollowings(response.payload as IUser[])
            })
    }, [])

    return (
        <>
            <h3>Following</h3>
            <div className="following-container">
                {
                    followings.map(following =>
                        <div className="following-card" key={following.id}>
                            <img
                                src={following.picture ? BASE_URL + following.picture : DEFAULT_PIC }
                                alt={`${following.name} ${following.surname}`}
                            />
                            <h3>{following.name} {following.surname}</h3>
                        </div>
                    )
                }
            </div>
        </>
    )
}
