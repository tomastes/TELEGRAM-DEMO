import { Avatar, IconButton } from "@material-ui/core";
import {
  MicNoneOutlined,
  MoreHoriz,
  SendRounded,
  TimerOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./Thread.css";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import { selectUser } from "../features/userSlice";
const Thread = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const ActivethreadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  });
  const sendMessage = (event) => {
    console.log(messages);
    event.preventDefault();
    console.log(threadId);
    if (threadId) {
      db.collection("threads")
        .doc(threadId && threadId)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          uid: user.uid,
          photo: user.photo,
          email: user.email,
          displayName: user.displayName,
        });
    }

    setInput("");
  };
  return (
    <div className="thread">
      {/* threadheader */}
      <div className="thread_header">
        {ActivethreadName && (
          <div className="thread_header_contents">
            <Avatar className="Avatar_header">{ActivethreadName[1]}</Avatar>
            <div className="thread_header_contents_info">
              <h4>{ActivethreadName}</h4>
              <h5>{`${new Date(
                   
                  ).getHours()}:${new Date(
                   
                  ).getMinutes()}`}</h5>
            </div>
          </div>
        )}
        <IconButton>
          <MoreHoriz className="thread_header_details" />
        </IconButton>
      </div>
      {/* //threadbody */}
      <div className="thread_messages">
        {messages?.map(
          ({ id, data: { email, timestamp, message, displayName } }) => (
            <div key={id}>
              <div className="thread_msg_single" key={id}>
                <Avatar className="Avatar_chat">{displayName[1]}</Avatar>
                <div className="message_header">
                  <h4>{displayName}</h4>
                  <span>{`${new Date(
                    timestamp?.toDate()
                  ).getHours()}:${new Date(
                    timestamp?.toDate()
                  ).getMinutes()}`}</span>
                </div>
              </div>
              <div className="message_body">{message}</div>
            </div>
          )
        )}
      </div>
      {/* //!threadbottom */}
      <div className="thread_input">
        <form
          onSubmit={(event) => sendMessage(event)}
          action="
            "
        >
          <input
            disabled={!ActivethreadName && true}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="write message"
          />
          <IconButton>
            <TimerOutlined />
          </IconButton>
          <IconButton>
            <SendRounded />
          </IconButton>
          <IconButton>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Thread;
