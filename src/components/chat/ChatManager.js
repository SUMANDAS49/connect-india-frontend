
import Base from "../../Base"
import "./chatManager.css"
import io from "socket.io-client";
import { isAuthenticated } from "../auth/Helper";
import ScrollableFeed from 'react-scrollable-feed'


import { useState, useEffect, useRef } from "react";
import { getUserProfile } from "../profile/ApiHelper";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";

const endpoint = "ws://localhost:8000/";
// const endpoint = "ws://okindia.herokuapp.com/";

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
  const [waitForTargetDetails, setWaitForTargetDetails] = useState(true)
  const [targetDetails, setTargetDetails] = useState({});
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
  useEffect(() => {
    getUserProfile(to).then((dta) => {
      setTargetDetails(dta);
      setTimeout(() => {
        setWaitForTargetDetails(false);
        console.log(targetDetails)

      }, 500)

    })

  }, [to])



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

    <div className="chat-main">
      <div className="chat-heading">
        <Link to="/">
          <ArrowBackIcon style={{ fontSize: "20px", marginRight: "10px", color: "white" }} />
        </Link>
        {waitForTargetDetails === false ? targetDetails.name + `(${targetDetails.email})` : "loading"}
      </div>
      <div className="message-display">

        <ul>

          {
            chats.map((chat) => {
              return <li style={chat.authorId === isAuthenticated().user._id ? { backgroundColor: "black", float: "right" } : { float: "left" }}>{chat.text}</li>
            })
          }
          <li style={{ backgroundColor: "transparent" }} ref={bottomRef} />


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

  );
};

export default ChatManager;
