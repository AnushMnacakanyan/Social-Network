import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { handleComment, handleDeleteComment, handleGetPostId } from '../lib/api';
import { IComment, IPost } from '../lib/types';
import { BASE_URL } from '../lib/constant';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export interface IProps {
    postId: number
    handleClose: () => void
    comments: IComment[]
}
export function Post({ postId, handleClose, comments }: IProps) {
    const [post, setPost] = useState<IPost | null>(null)
    const [text, setText] = useState<string>("")

    const handleDelComment = (id: number) => {
        handleDeleteComment(id)
            .then(response => {
                console.log(response);
                if (post) {
                    const updateCom = post.comments.filter(com => com.id != id)
                    setPost({ ...post, comments: updateCom })
                }
            })
    }


    const handleSubmit = () => {
        handleComment(postId, text)
            .then(response => {
                setText("")
            })
    }

    useEffect(() => {
        handleGetPostId(postId)
            .then(response => {
                setPost(response.payload as IPost)

            })
    })

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        POST no. {postId}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>

                    <div className="modal-container">
                        <div className="post-image-container">
                            <img
                                src={BASE_URL + post?.picture}
                                alt="Post Image"
                            />
                        </div>

                        <div className="likes-container">
                            <h3>likes</h3>
                            {post?.likes.map(like => (
                                <div key={like.id} className="like-item">
                                    <img
                                        src={BASE_URL + like.picture}
                                        alt={`${like.name} ${like.surname}`}
                                    />
                                    <p>{like.name} {like.surname}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3>comment</h3>
                            {post?.comments ? (
                                post?.comments.map(comment => (
                                    <div key={comment.id} className="comment-item">
                                        <img src={BASE_URL + comment.user.picture} style={{ width: 50, height: 50 }} />
                                        <p>{comment.user.name} {comment.user.name}</p>
                                        <p>{comment.content}</p>
                                        <button onClick={() => handleDelComment(comment.id)}>Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}>
                                <input
                                    type="text"
                                    placeholder="What you think?"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                </Box>

            </Modal>
        </div>
    );
}