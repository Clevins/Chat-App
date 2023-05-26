import { User } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  doc,
  or,
  and,
  DocumentData,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { FC, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Message from "../Message/Message";

import styles from "./Messages.module.css";

type MessagesProps = {
  activeUser: DocumentData;
  currentUser: User;
};

const Messages: FC<MessagesProps> = ({ activeUser, currentUser }) => {
  const firestore = useFirestore();
  const [newMessage, setNewMessage] = useState<string>();

  const currentUserRef = doc(firestore, "users", currentUser.uid);
  const activeUserRef = doc(firestore, "users", activeUser.uid);

  const messageCollection = collection(firestore, "message");
  const messageQuery = query(
    messageCollection,
    or(
      and(
        where("sentBy", "==", currentUserRef),
        where("sentTo", "==", activeUserRef)
      ),
      and(
        where("sentBy", "==", activeUserRef),
        where("sentTo", "==", currentUserRef)
      )
    ),

    orderBy("sentAt", "asc")
  );
  const { data: messages } = useFirestoreCollectionData(messageQuery);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await sendMessage();
  }

  const sendMessage = async () => {
    try {
      const res = await setDoc(doc(collection(firestore, "message")), {
        sentBy: currentUserRef,
        sentTo: activeUserRef,
        sentAt: Timestamp.fromDate(new Date()),
        messageText: newMessage,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (messages) {
    return (
      <div className={styles.messages}>
        <div className={styles.messages__header}>
          <div className={styles.messages__title}>Messages</div>

          <div className={styles.user__info}>
            <div className={styles.user__photo}>
              <img src={activeUser.photoURL} />
            </div>

            <div className={styles.user__name}>{activeUser.displayName}</div>
          </div>
        </div>
        <div className={styles.messages__container}>
          {messages.map((message) => {
            return (
              <Message
                message={message}
                currentUser={currentUser}
                activeUser={activeUser}
              />
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="newMessage"
            type="text"
            className={styles.message__input}
            placeholder="Write Message..."
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </form>
      </div>
    );
  } else {
    return <span>loading...</span>;
  }
};

export default Messages;
