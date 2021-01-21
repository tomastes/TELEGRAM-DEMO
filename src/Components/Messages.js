import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

const Messages = ({id,data:{timestamp,displayName,email,message,photo,uid}}) => {
    const user = useSelector(selectUser)
    return (
        <div className={`message ${user.email === email && `message_sender`}`}>
            <Avatar src={photo} className="message_photo"/>
            <div className="message_contents">
                <p>{message}</p>
                <small>timstamp</small>
            </div>
        </div>
    )
}

export default Messages
