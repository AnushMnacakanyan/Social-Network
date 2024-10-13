import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleGetFollowers } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Followers = () => {
    const [followers, setFollowers] = useState<IUser[]>([])

    useEffect(() => {
        handleGetFollowers()
            .then(response => {
                setFollowers(response.payload as IUser[])
            })
    }, [])

    return (
        <div>
            <h3>Followers</h3>
            <div className="followers-container">
                {
                    followers.map(follower =>
                        <div className="follower-card" key={follower.id}>
                            <img
                                src={follower.picture ? BASE_URL + follower.picture : DEFAULT_PIC}
                                alt={`${follower.name} ${follower.surname}`}
                            />
                            <h4>{follower.name} {follower.surname}</h4>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
