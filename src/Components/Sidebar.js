import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  BorderColorOutlined,
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings,
} from "@material-ui/icons";
import SidebarThread from "./SidebarThread";
import db, { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from 'firebase'
const Sidebar = () => {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    db.collection('threads').onSnapshot((snapShot) =>
      setThreads(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  },[]);

  const addThread =()=>{
      const threadName = prompt('add thread name')
      if(threadName){
          db.collection('threads').add({
              threadName:threadName,
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
          })
      }
  }
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_search">
          <input className="sidebar_input" type="text" placeholder="search" />
          <SearchIcon />
        </div>
        <IconButton onClick={addThread} variant="outlined" id="sidebar_button">
          <BorderColorOutlined />
        </IconButton>
      </div>
      {/* sidebar threads */}

      <div className="sidebar_threads">
          {threads.map(({id,data:{threadName,timestamp}})=>(
         
                      <SidebarThread timestamp={timestamp} id={id} key={id} threadName={threadName}/>

          ))}
      </div>
      {/* sidebar bottom */}
      <div className="sidebar_bottom">
        <Avatar src={user?.photo}
          className="sidebar_bottom_avatar"
          onClick={() => auth.signOut()}
        />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
