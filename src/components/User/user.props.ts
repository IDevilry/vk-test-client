import { type IUser } from "../../types";

export type UserProps = {
  user: IUser;
  currentUser: IUser;
  isFriend: boolean;
};
