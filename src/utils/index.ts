import { axiosInstance } from "../api";
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

export const findChatWithUser = async (
  navigate: Function,
  currentUser: IUser,
  user?: IUser
): Promise<void> => {
  if (!user) return;
  const chatWithUser = await axiosInstance.get<IChat>(
    `/chats/find/${currentUser._id}/${user._id}`
  );
  if (chatWithUser.data) {
    navigate("/chat", {
      state: {
        chatId: chatWithUser.data,
      },
    });
  } else {
    const chat = await axiosInstance.post<IChat>("/chats/new", {
      senderId: currentUser._id,
      receiverId: user._id,
    });
    if (chat) {
      navigate("/chat", {
        state: {
          chatId: chat.data,
        },
      });
    }
  }
};
