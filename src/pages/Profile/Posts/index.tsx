import { useEffect, useRef, useState } from "react"
import { handleDeletePost, handleGetPosts, handlePostCreation } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import { Gallery } from "../../../components/Gallery"

export const Posts = () => {
    const [list, setList] = useState<IPost[]>([])
    const [text, setText] = useState<string>("")

    const photo = useRef<HTMLInputElement | null>(null)

    const handleUpload = () => {
        if (photo.current) {
            const file = photo.current.files?.[0]
            if (file) {
                const form = new FormData
                form.append("photo", file)
                form.append('content', text)
                handlePostCreation(form)
                    .then(response => {
                        console.log(response);
                        setList([...list, response.payload as IPost])
                    })
            }
        }
    }
    const handleDelete = (id:number) => {
        handleDeletePost(id)
        .then(response=> {
            console.log(response);
            
            setList([...list.filter(post => post.id != id)])
        })
    }
    useEffect(() => {
        handleGetPosts()
            .then(response => {
                console.log(response.payload);
                setList(response.payload as IPost[])
            })
    }, [])

    return (
        <div className="posts-container">
            <h3>Posts</h3>
            <p>You have {list.length} posts</p>

            <input
                type="file"
                style={{ display: "none" }}
                ref={photo}
                onChange={handleUpload}
            />
            <input
                className="form-control"
                placeholder="What's on your mind?"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <br />
            <button onClick={() => photo.current?.click()} className="btn btn-s btn-info my-2">Upload</button>
            <Gallery posts={list} onDelete={handleDelete} />
        </div>
    )
}
