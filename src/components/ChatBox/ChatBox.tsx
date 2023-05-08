import { type FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchMessages } from "../../redux/asyncThunks/chat/fetchMessages";
import { fetchNewMessage } from "../../redux/asyncThunks/chat/fetchNewMessage";
import { addMessage } from "../../redux/slices/chat/messagesSlice";

import { type ChatBoxProps } from "./chatbox.props";

import Message from "../Message/Message";

import defaultPhoto from "../../assets/default_user_photo.jpg";
import cn from "./chatBox.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const ChatBox: FC<ChatBoxProps> = ({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
}) => {
  const messages = useAppSelector((state) => state.messages.messages);
  const dispatch = useAppDispatch();

  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef<HTMLDivElement | null>(null);

  const companion = chat?.members?.find(
    (member) => member._id !== currentUser._id
  );

  useEffect(() => {
    if (chat) {
      dispatch(fetchMessages({ chatId: chat._id }));
    }

    return () => {
      setNewMessage("");
    };
  }, [chat, dispatch]);

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId === chat?._id) {
      dispatch(addMessage(receiveMessage));
    }
  }, [chat, dispatch, receiveMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (chat) {
      const message = {
        chatId: chat?._id,
        senderId: currentUser._id,
        text: newMessage,
        createdAt: new Date().toString(),
      };

      dispatch(fetchNewMessage(message));
      dispatch(addMessage(message))
      
      setSendMessage({
        ...message,
        companion: companion,
        createdAt: new Date().toString(),
      });

      setNewMessage("");
    }
  };

  return (
    <div className={cn.chatWrapper}>
      <div className={cn.chatContainer}>
        <div className={cn.chatHeader}>
          {companion && (
            <img
              src={
                companion?.profile_photo
                  ? `${API_URL}/${companion.profile_photo}`
                  : defaultPhoto
              }
              alt="user avatar"
            />
          )}
          <div className={cn.flex}>
            {companion && (
              <>
                <span className={cn.name}>
                  {companion?.user_first_name} {companion?.user_last_name}
                </span>
                <span className={cn.online}>Не в сети</span>
              </>
            )}
          </div>
        </div>
        <hr className={cn.hr} />
        <div className={cn.chatList}>
          {messages?.map((message) => (
            <div
              key={message.createdAt}
              className={
                message.senderId === currentUser._id
                  ? cn.messageOwn
                  : cn.message
              }
              ref={scroll}
            >
              <Message key={message.createdAt} message={message} />
            </div>
          ))}
        </div>
      </div>
      <div className={cn.inputWrapper}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          name="message"
          type="text"
          required
          placeholder="Введите сообщение..."
        />
        <button onClick={handleSend} type="button">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
