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
    return <>
        {requests.map(request =>
            <div key={request.id}>
                <div>
                    <img
                        src={request.picture ? BASE_URL + request.picture : DEFAULT_PIC}
                        style={{ width: 100, height: 100 }}
                    />
                    <h3>{request.name} {request.surname}</h3>
                </div>
                <div>
                    <button onClick={() => handleAccept(request.id)}>Accept</button>
                    <button onClick={() => handleDecline(request.id)} >Decline</button>
                </div>
            </div>
        )}
    </>
}