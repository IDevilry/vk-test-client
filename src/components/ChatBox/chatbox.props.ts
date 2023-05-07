import { type IChat, type IMessage, type IUser } from "../../types";

export type ChatBoxProps = {
    currentUser: IUser;
    chat: IChat | undefined;
    setSendMessage: (message: IMessage) => void;
    receiveMessage: IMessage | undefined;
  };