import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectThreadId, setThread,selectActiveThread } from '../features/threadSlice'
import "./SidebarThread.css"
const SidebarThread = ({timestamp,id,threadName}) => {
 const dispatch = useDispatch()
 const [activeThread, setActiveThread] = useState(false)
    const addActiveThread =(e)=>{
  setActiveThread(true)
        dispatch(setThread({
            threadName,id
        }))
    
    }
    return (
        
        <div onClick={e=>addActiveThread(e)} className={  `sidebar_thread `}>
            <Avatar className="Avatar">{threadName[1]}</Avatar>
            <div className="sidebarthread__details">
            <h3>{threadName}</h3>
            <p>this is first message</p>
            <small className="sidebarthread__timestamp">{`${new Date(timestamp?.toDate()).getHours()}:${new Date(timestamp?.toDate()).getMinutes()}`}</small>
            </div>
           
        </div>
    )
}

export default SidebarThread
