import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { Gallery } from '../../../components/Gallery';
import { IAccount } from '../../../lib/types';
import { handleAccound, handleCancelRequest, handleSendFollow, handleUnfollow } from '../../../lib/api';
import { BASE_URL, DEFAULT_PIC } from '../../../lib/constant';
export function Account() {
    const { id } = useParams();
    const [found, setFound] = useState<IAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleRequest = () => {
        if (found) {
            if (found.connection.following) {
                setFound({
                    ...found,
                    connection: { ...found.connection, following: false }
                });
                unfollwUser();
            } else if (found.connection.requested) {
                setFound({
                    ...found,
                    connection: { ...found.connection, requested: false }
                });
                cancelRequest();
            } else {
                setFound({
                    ...found,
                    connection: { ...found.connection, requested: true }
                });
                followUser();
            }
        }
    };
    const followUser = () => {
        if (found && found.id) {
            setLoading(true);
            handleSendFollow(found.id)
                .then(response => {
                    setLoading(false);
                    if (response.status === "following") {
                        setFound({
                            ...found,
                            connection: { ...found.connection, following: true, requested: false }
                        });
                    } else {
                        setFound({
                            ...found,
                            connection: { ...found.connection, requested: true, following: false }
                        });
                    }
                })
                .catch(() => setLoading(false));
        }
    };
    const unfollwUser = () => {
        if (found && found.id) {
            setLoading(true);
            handleUnfollow(found.id)
                .then(response => {
                    setLoading(false);
                    if (response.status === "unfollowing") {
                        setFound({
                            ...found,
                            connection: { ...found.connection, following: false, requested: false }
                        });
                    }
                })
                .catch(() => setLoading(false));
        }
    };
    const cancelRequest = () => {
        if (found && found.id) {
            setLoading(true);
            handleCancelRequest(found.id)
                .then(response => {
                    setLoading(false);
                    if (response.status === "cancelled") {
                        setFound({
                            ...found,
                            connection: { ...found.connection, requested: false }
                        });
                    }
                })
                .catch(() => setLoading(false));
        }
    };
    useEffect(() => {
        if (id) {
            handleAccound(id)
                .then(response => {
                    if (!response.payload) {
                        navigate("/profile");
                    } else {
                        setFound(response.payload as IAccount);
                    }
                });
        }
    }, [id, navigate]);
    return (
        found && <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="container py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="12" xl="4">
                        <MDBCard style={{ borderRadius: '15px' }}>
                            <MDBCardBody className="text-center">
                                <div className="mt-3 mb-4">
                                    <MDBCardImage src={found.picture ? BASE_URL + found.picture : DEFAULT_PIC}
                                        className="rounded-circle" fluid style={{ width: '100px' }} />
                                </div>
                                <MDBTypography tag="h4">{found.name} {found.surname}</MDBTypography>
                                <MDBCardText className="text-muted mb-4">
                                </MDBCardText>
                                {found.posts && <Gallery posts={found.posts} />}
                                <button
                                    onClick={handleRequest}
                                    className="btn btn-info"
                                    disabled={loading}
                                >
                                    {
                                        found.connection.following
                                            ? "Unfollow"
                                            : found.connection.followsMe
                                                ? "Follow Back"
                                                : found.connection.requested
                                                    ? "Cancel Request"
                                                    : "Follow"
                                    }
                                </button>
                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <MDBCardText className="mb-1 h5">8471</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">8512</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">4751</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}