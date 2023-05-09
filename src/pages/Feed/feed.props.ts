import { type IPost } from "../../types";

export type FeedProps = {
    isCurrentUser?: boolean
    posts: IPost[] | undefined
};
