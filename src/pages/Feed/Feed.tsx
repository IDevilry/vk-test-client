import { NewPost, Post } from "../../components";

import { type FC } from "react";

import { FeedProps } from "./feed.props";

const Feed: FC<FeedProps> = ({ posts, isCurrentUser }) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="widgetContainer">
        {isCurrentUser ? <NewPost /> : null}
      </div>
      <hr />
      <div className="widgetContainer">
        {posts?.length ? (
          posts?.map((post) => (
            <div key={post._id}>
              <Post post={post} />
              <hr />
            </div>
          ))
        ) : (
          <p>Не найдено ни одного поста :\</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
