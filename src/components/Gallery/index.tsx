import { useState } from "react"
import { handlePostReaction } from "../../lib/api"
import { BASE_URL } from "../../lib/constant"
import { IPost } from "../../lib/types"
import { Post } from "../Post"
import { colors } from "@mui/material"

interface IProps {
    posts: IPost[]
    onUpdatePost?: (id: number) => void
    onDelete?: (id: number) => void
}

export const Gallery: React.FC<IProps> = ({ posts, onUpdatePost, onDelete }) => {
    const [currentPost, setCurrentPost] = useState<number>(-1)
    const reactPost = (id: number) => {
        handlePostReaction(id)
            .then(response => {
                if (onUpdatePost) {
                    onUpdatePost(id)
                }
            })
    }
    return <>

        <p className="posts-length">You have {posts.length} posts</p>
        <div className="post-block">
            {
                posts.map(post =>
                    <div key={post.id} className="post">
                        <img className=" post-img"
                            src={BASE_URL + post.picture}
                        />
                        <div
                            onClick={() => setCurrentPost(post.id)}
                            className="cover"
                        ></div>
                        <img
                            className="like-btn"
                            onClick={() => reactPost(post.id)}
                            src={
                                post.isLiked ?
                                    "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_pink.png"
                                    : "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png"

                            }
                        />
                        <button  onClick={() => onDelete(post.id)}>delete</button>
                    </div>
                )
            }
        </div>
        {currentPost != -1 && <Post postId={currentPost} handleClose={() => setCurrentPost(-1)} />}

    </>
}