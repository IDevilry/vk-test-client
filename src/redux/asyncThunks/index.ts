import { fetchMyPosts, fetchPosts } from "./post/fetchPosts";
import { fetchCurrentUser } from "./user/fetchCurrentUser";
import { fetchUpdateUser } from "./user/fetchUpdateUser";
import { fetchNewPost } from "./post/fetchNewPost";
import { fetchAllUsers } from "./user/fetchAllUsers";
import { fetchFriends } from "./user/fetchFriends";
import { toggleFriend } from "./user/toggleFriend";
import { fetchChats } from "./chat/fetchChats";
import { fetchMessages } from "./chat/fetchMessages";
import { fetchNewMessage } from "./chat/fetchNewMessage";

export {
  fetchCurrentUser,
  fetchMyPosts,
  fetchPosts,
  fetchUpdateUser,
  fetchAllUsers,
  fetchChats,
  fetchMessages,
  fetchNewMessage,
  fetchNewPost,
  toggleFriend,
  fetchFriends,
};
