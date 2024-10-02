import { useState } from 'react';
import { handleIsPrivate } from '../../lib/api';
import { useOutletContext } from 'react-router-dom';
import { IContextType } from '../../lib/types';

export const Status = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const { account, setAccount } = useOutletContext<IContextType>()
  const switchTo = () => {
    handleIsPrivate()
      .then(response => {
        setAccount({ ...account, isPrivate: response.payload as number })
      })
  }
  return <div className='status'>
    <p>Hey {account.name}, your account is <strong>{account.isPrivate == 1 ? "private" : "public"}</strong></p>
    <img
      className="icon"
      onClick={switchTo}
      src={
        account.isPrivate ?
          "https://cdn1.iconfinder.com/data/icons/internet-security-26/64/x-01-512.png"
          :
          "https://cdn1.iconfinder.com/data/icons/internet-security-26/64/x-11-512.png"
      }
    />

  </div>

}
