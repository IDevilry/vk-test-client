import { type FC } from "react";
import { type MessageProps } from "./message.props";

// import cn from "./message.module.css";

const Message: FC<MessageProps> = ({ message }) => {
  const { text } = message;

  return (
    <div>
      <span>{text}</span>
      <span>{}</span>
    </div>
  );
};

export default Message;
