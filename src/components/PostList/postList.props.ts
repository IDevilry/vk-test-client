import { IPost } from "../../types";

export type IPostListProps = {
    posts: IPost[];
    totalCount: number;
    countOnPage?: number;
  }