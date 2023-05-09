import { NewPost, Post } from "../../components";

import { ImSpinner4 } from "react-icons/im";
import { useAppSelector } from "../../hooks/typedRedux";

import { type FC } from "react";
import { type FeedProps } from "./feed.props";

const Feed: FC<FeedProps> = ({ posts, isCurrentUser = false }) => {
  const isLoading = useAppSelector((state) => state.posts.isLoading);

  return (
    <div style={{ width: "100%" }}>
      {isCurrentUser ? (
        <div className="widgetContainer">
          <NewPost />
        </div>
      ) : null}
      <hr />
      <div className="widgetContainer">
        {posts?.length ? (
          posts?.map((post) => (
            <div key={post._id}>
              <Post post={post} />
              <hr />
            </div>
          ))
        ) : isLoading ? (
          <ImSpinner4
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        ) : (
          <p>Не найдено ни одного поста :\</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
