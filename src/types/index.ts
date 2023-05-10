export interface IPostList {
  posts: IPost[];
  totalCount: number;
  countOnPage: number;
}

export interface IFriendList {
  totalCount: number;
  user: {
    _id?: string;
    friends: IUser[];
  };
}

export interface IUserById {
  isFriend?: boolean;
  totalCount: number;
  user: IUser;
}

export interface IUser {
  _id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  age?: number;
  posts?: IPost[];
  city?: string;
  institution?: string;
  description?: string;
  profile_photo?: string;
  friends?: IUser[];
}

export interface IPost {
  _id: string;
  user: IUser;
  title?: string;
  content: string;
  image?: string;
  likes?: string[];
  createdAt: string;
}

export interface INewPost {
  user?: string;
  title?: string;
  content?: string;
}

export interface IUserToUpdate {
  _id: string;
  user_email?: string;
  age?: number;
  city?: string;
  institution?: string;
  description?: string;
  profile_photo?: File | string;
}

export interface IChat {
  _id: string;
  createdAt: Date;
  members: IUser[];
}

export interface IMessage {
  _id?: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  companion?: IUser;
}

export interface INewMessage {
  chatId: string;
  senderId: string;
  text: string;
}
