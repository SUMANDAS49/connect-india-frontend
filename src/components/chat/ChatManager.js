
import Base from "../../Base"
import "./chatManager.css"
import io from "socket.io-client";
import { isAuthenticated } from "../auth/Helper";

import { useState, useEffect } from "react";

// const endpoint = "ws://localhost:8000/";
const endpoint = "ws://okindia.herokuapp.com/";




let socket;
const ChatManager = () => {
  const [trig, setTrig] = useState(false);
  const [chats, setChats] = useState([{ text: "hi dummy", authorId: "ugyuft87678uih8tfjni", time: "1234" }]);
  const [chatDoc, setChatDoc] = useState({})
  const [chat, setChat] = useState({
    text: "",
    authorId: "",
    time: "",
  });
  const { authorId, text, time } = chat
  const [to, setTo] = useState("")
  let target;
  useEffect(() => {
    let s = window.location.href;
    let l = s.length;
    // console.log(s.substring(l-24,l))
    target = s.substring(l - 24, l);
    setTo(target)
    socket = io(endpoint);
    console.log(socket);

    socket.emit(
      "joined",
      {
        name: isAuthenticated().user.name,
        u1id: isAuthenticated().user._id,
        u2id: target,

      },
      (res) => {
        console.log(res);
        setChatDoc(res)
      }
    );
  }, []);



  const sendMessage = () => {


    setChats([...chats, chat]);
    console.log("--target" + chat.authorId)
    socket.emit("chat-message", { chat: chat, toUser: to, cid: chatDoc._id });
    setChat({ text: "", authorId: "", time: "" })
  }
  useEffect(() => {
    socket.on("r-chat-message", (message) => {
      let k = chats;
      k.push(message)
      setChats(k)
      console.log(chats)
    })
  }, [])

  return (
    <Base>
      <div className="chat-main">
        <div className="chat-heading">Chat manager</div>
        <div className="message-display">
          <ul>
            {
              chats.map((chat) => {
                return <li style={chat.authorId === isAuthenticated().user._id ? { backgroundColor: "black", float: "right" } : { float: "left" }}>{chat.text}</li>
              })
            }
          </ul>
        </div>
        <div className="message-input">
          <input
            placeholder="write here..."
            type="text"
            value={chat.text}
            onChange={(e) => {
              setChat({ text: e.target.value, authorId: isAuthenticated().user._id, time: Date() });
            }}
          />
          <button
            onClick={() => {
              sendMessage()
            }}
          >
            send
          </button>
        </div>

      </div>
    </Base>
  );
};

export default ChatManager;
