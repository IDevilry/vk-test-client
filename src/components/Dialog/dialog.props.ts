import { IChat, IUser } from "../../types";

export type DialogProps = {
  isOnline: boolean;
  chat: IChat;
  currentUser: IUser;
};
