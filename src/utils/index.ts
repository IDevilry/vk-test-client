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

export const getRelativeTimeString = (
  date: Date | number,
  language: string = "ru"
) => {
  const timeMs = typeof date === "number" ? date : date.getTime();

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};
