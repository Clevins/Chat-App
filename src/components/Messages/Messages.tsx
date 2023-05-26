import { collection, doc } from "firebase/firestore";
import { FC, useEffect, useRef, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { getMessagesQuery } from "../../lib/firebaseQueries";
import scrollToDiv from "../../lib/scrollToDiv";
import sendMessage from "../../lib/sendMessage";
import { MessagesProps } from "../../lib/types";
import Message from "../Message/Message";

import styles from "./Messages.module.css";

const Messages: FC<MessagesProps> = ({ activeUser, currentUser }) => {
  const firestore = useFirestore();
  const [newMessage, setNewMessage] = useState<string>("");

  const currentUserRef = doc(firestore, "users", currentUser.uid);
  const activeUserRef = doc(firestore, "users", activeUser.uid);

  const messageCollection = collection(firestore, "message");
  const messageQuery = getMessagesQuery(
    messageCollection,
    currentUserRef,
    activeUserRef
  );

  const { data: messages } = useFirestoreCollectionData(messageQuery);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToDiv(messagesEndRef);
  }, [messages]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (newMessage) {
      await sendMessage(firestore, newMessage, currentUserRef, activeUserRef);
    }
    setNewMessage("");
  }

  if (messages) {
    return (
      <div className={styles.messages}>
        <div className={styles.messages__header}>
          <div className={styles.messages__title}>Messages</div>

          <div className={styles.user__info}>
            <div className={styles.user__photo}>
              <img src={activeUser.photoURL} alt="Profile Picture" />
            </div>

            <div className={styles.user__name}>{activeUser.displayName}</div>
          </div>
        </div>
        <div className={styles.messages__container}>
          {messages.map((message, index) => {
            return (
              <Message
                key={index}
                message={message}
                currentUser={currentUser}
                activeUser={activeUser}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.messages__form}>
          <input
            name="newMessage"
            type="text"
            value={newMessage}
            className={styles.message__input}
            placeholder="Write Message..."
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className={styles.messages__submit}
            onClick={() => handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    );
  } else {
    return <span>loading...</span>;
  }
};

export default Messages;
