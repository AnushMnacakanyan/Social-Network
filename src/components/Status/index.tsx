import { useState } from 'react';
import { handleIsPrivate } from '../../lib/api';

export const Status = () => {
    const [isPrivate, setIsPrivate] = useState<boolean>(false); 

    const handleStatus = () => {
      handleIsPrivate()
      .then(response=>{
              if(response.payload == 1){
                setIsPrivate(true)
              }else{
                setIsPrivate(false)
              }
      })
    }

    return <div className='status'>
            <h3>Status: {isPrivate ? 'Private' : 'Public'}</h3>
            <img
                onClick={handleStatus}
                src={isPrivate ?  "https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/102-512.png":"https://cdn2.iconfinder.com/data/icons/pittogrammi/142/92-512.png" }
                style={{width:100,height:100}}
            />
        </div>
    
}
