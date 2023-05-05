export interface IPostList {
  posts: IPost[];
  totalCount: number;
  countOnPage: number;
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
}

export interface IPost {
  _id: string;
  user: IUser;
  title?: string;
  content: string;
  image?: string;
  likes?: IUser[];
}

export interface INewPost {
  user?: string;
  title?: string;
  content?: string;
  image?: string;
}

export interface IUserToUpdate {
  _id: string;
  user_email?: string;
  age?: number;
  city?: string;
  institution?: string;
  description?: string;
  profile_photo?: string;
}
