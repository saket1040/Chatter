import React, { useState } from "react";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import GroupChat from "./components/GroupChat";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import Chat from "./components/PvtChat.js";
const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const [pvtChat, setPvtChat] = useState(false)

  //if not authenticated, redirecting user to sign in page

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  //if user selects private chat,rendering private chat screen
  if (pvtChat) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/chat-home/:receiverId"
              element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  //if user select for group chat render chat room
  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input onChange={(e) => setRoom(e.target.value)} />
          <button
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter Group Chat
          </button>

          <button style={{ marginTop: "40px" }} onClick={() => {
            setPvtChat(true);
          }}>
            Private Chat</button>
        </div>
      ) : (
        <GroupChat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;