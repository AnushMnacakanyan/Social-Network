import { IRequest } from '../../../lib/types'
import { handleAcceptRequest, handleAccound, handleDeclineRequest, handleGetRequest } from '../../../lib/api'
import { useEffect, useState } from 'react'
import { BASE_URL, DEFAULT_PIC } from '../../../lib/constant'

export const Requests = () => {
    const [requests, setRequests] = useState<IRequest[]>([])
    useEffect(() => {
        handleGetRequest()
            .then(response => {
                if (response.payload) {
                    console.log(response.payload);
                    setRequests(response.payload as IRequest[]);
                }
            });
    }, []);

    const handleAccept = (id: number | undefined) => {
        handleAcceptRequest(id)
            .then(response => {
                setRequests([...requests.filter(request => request.id != id)])


            })
    }
    const handleDecline = (id: number | undefined) => {
        handleDeclineRequest(id)
            .then(response => {
                setRequests([...requests.filter(request => request.id != id)])
            })

    }
    return <div className='request'>
        {requests.map((request) => (
            <div className="request-card" key={request.id}>
                <img
                    src={request.user.picture ? BASE_URL + request.user.picture : DEFAULT_PIC}
                    alt="User"
                />
                <div className="request-info">
                    <h3>{request.user.name} {request.user.surname}</h3>
                </div>
                <div className="request-actions">
                    <button onClick={() => handleAccept(request.id)}>Accept</button>
                    <button className="decline" onClick={() => handleDecline(request.id)}>Decline</button>
                </div>
            </div>
        ))}
    </div>

}