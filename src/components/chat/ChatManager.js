
import Base from "../../Base"
import "./chatManager.css"
import io from "socket.io-client";
import { isAuthenticated } from "../auth/Helper";
import ScrollableFeed from 'react-scrollable-feed'

import { useState, useEffect, useRef } from "react";

// const endpoint = "ws://localhost:8000/";
const endpoint = "ws://okindia.herokuapp.com/";




let socket;
const ChatManager = () => {
  const [trig, setTrig] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatDoc, setChatDoc] = useState({})
  const [rld, setRld] = useState(false)
  const [chat, setChat] = useState({
    text: "",
    authorId: "",
    time: "",
  });
  //auto scrole to buttom 
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(scrollToBottom, [chats, chat]);


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

    let k = chats
    k.push(chat);
    setChats(k)

    console.log("--target" + chat.authorId)
    socket.emit("chat-message", { chat: chat, toUser: to, cid: chatDoc._id });
    setChat({ text: "", authorId: "", time: "" })
  }
  useEffect(() => {
    socket.on("r-chat-message", (message) => {
      // let k = chats;
      // k.push(message)
      // setChats(k)
      setChats(chats => [...chats, message])
      console.log(chats)

      console.log("message aa gya-----")
      setRld(!rld)




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
            <li style={{ backgroundColor: "white" }} ref={bottomRef} />


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