/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, useEffect, useState } from "react";
import { socket } from "../../socket";

import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchChats } from "../../redux/asyncThunks/chat/fetchChats";
import { setOnlineUsers } from "../../redux/slices";

import { type IChat, type IMessage, type IUser } from "../../types";

import { useLocation } from "react-router-dom";
import { Dialog, ChatBox } from "../../components";

import cn from "./chat.module.css";

const Chat: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);
  const chats = useAppSelector((state) => state.chats.chats);
  const onlineUsers = useAppSelector((state) => state.users.onlineUsers);
  const dispatch = useAppDispatch();

  const { state: locationState } = useLocation();

  const [currentChat, setCurrentChat] = useState<IChat>();
  const [sendMessage, setSendMessage] = useState<IMessage>();
  const [receiveMessage, setReceiveMessage] = useState<IMessage>();

  const checkOnlineStatus = (chat: IChat) => {
    const companion = chat?.members.find((member) => member._id !== user._id);
    const isOnline = onlineUsers.find((user) => user._id === companion?._id);
    return isOnline ? true : false;
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchChats({ userId: user._id }));
      if (locationState?.chatId) {
        setCurrentChat(locationState.chatId);
      }
    }
  }, [dispatch, currentChat, user]);

  useEffect(() => {
    socket.on("getUsers", (users: IUser[]) => {
      dispatch(setOnlineUsers(users));
    });
    return () => {
      socket.off("getUsers");
    };
  }, []);

  useEffect(() => {
    if (sendMessage) {
      socket.emit("sendMessage", sendMessage);
    }
    return () => {
      socket.off("sendMessage");
    };
  }, [sendMessage]);

  useEffect(() => {
    socket.on("takeMessage", (message: IMessage) => {
      setReceiveMessage(message);
    });
    return () => {
      socket.off("takeMessage");
    };
  }, [dispatch]);

  return (
    <div className={cn.chat}>
      <div className={cn.leftSideChat}>
        <div className={cn.chatContainer}>
          <h2>Чаты</h2>
          <div className={cn.chatList}>
            {chats?.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Dialog
                  chat={chat}
                  currentUser={user}
                  isOnline={checkOnlineStatus(chat)}
                  key={chat._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChatBox
        chat={currentChat}
        currentUser={user}
        setSendMessage={setSendMessage}
        receiveMessage={receiveMessage}
      />
    </div>
  );
};

export default Chat;
