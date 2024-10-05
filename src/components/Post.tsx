import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { handleGetPostId } from '../lib/api';
import { IPost } from '../lib/types';
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
}
export function Post({ postId, handleClose }: IProps) {
    const [post, setPost] = useState<IPost | null>(null)
    useEffect(() => {
        handleGetPostId(postId)
            .then(response => {
                setPost(response.payload as IPost)
                console.log(post);

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
                    </div>
                </Box>

            </Modal>
        </div>
    );
}