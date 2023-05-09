import { type IChat, type IUser } from "../types";

export const checkOnlineStatusInChat = (
  chat: IChat,
  onlineUsers: IUser[],
  user: IUser
) => {
  const companion = chat?.members.find((member) => member._id !== user._id);
  const isOnline = onlineUsers.find((user) => user._id === companion?._id);
  return isOnline ? true : false;
};

export const checkOnlineStatus = (onlineUsers: IUser[], targetUser: IUser) => {
  const isOnline = onlineUsers.find((user) => user._id === targetUser._id);
  return isOnline ? true : false;
};
