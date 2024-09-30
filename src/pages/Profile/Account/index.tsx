import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IAccount, IUser } from "../../../lib/types"
import { handleAccound } from "../../../lib/api"
import { BASE_URL } from "../../../lib/constant"
import { Gallery } from "../../../components/Gallery"

export const Account = () => {
    const [user, setUser] = useState<IAccount>()
    const { id } = useParams<string>()
    useEffect(() => {
        handleAccound(id)
            .then(response => {
                console.log(response.payload);

                setUser(response.payload as IAccount)
            })
    }, [id])

    return <div className="account-container">
        {user?.isPrivate ? (
            <>
                <h5>Status: Private</h5>
                <h3>{user?.name} {user?.surname}</h3>
                <img
                    src={BASE_URL + user?.picture}
                    style={{ width: 100, height: 100 }}
                    alt={`${user?.name}'s profile`}
                />
            </>
        ) : (
            <>
                <h5>Status: Public</h5>
                <h3>{user?.name} {user?.surname}</h3>
                <img
                    src={BASE_URL + user?.picture}
                    style={{ width: 100, height: 100 }}
                    alt={`${user?.name}'s profile`}
                />
                <div className="account-posts">
                    <h2>POSTS</h2>
                    {user?.posts?.map(post => (
                        <Gallery key={post.id} posts={[post]} />
                    ))}
                </div>
            </>
        )}
    </div>


}