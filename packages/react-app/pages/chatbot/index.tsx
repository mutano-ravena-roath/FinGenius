/** react */
import { FC } from "react";

import { AiOutlineSend } from "react-icons/ai";
import { RiRobot2Fill } from "react-icons/ri";

/** styles */
import styles from "./styles.module.scss";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const ChatbotPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.placeholder}>
        <h1>Chatbot</h1>
        <h2>Ask anything about your investments</h2>
        <RiRobot2Fill size={64} color="var(--primary)" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Type a message or question about your investment"
        />
        <AiOutlineSend color="var(--primary)" size={32} />
      </div>
    </div>
  );
};

export default ChatbotPage;
