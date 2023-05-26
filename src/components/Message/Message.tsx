import { User } from "firebase/auth";
import { doc, DocumentData } from "firebase/firestore";
import { FC } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

import styles from "./Message.module.css";

type MessageProps = {
  currentUser: User;
  activeUser: DocumentData;
  message: DocumentData;
};

const Message: FC<MessageProps> = ({ currentUser, activeUser, message }) => {
  const timestamp = new Date(
    (message.sentAt.seconds as number) * 1000
  ).toLocaleString();

  const firestore = useFirestore();

  const currentUserDocRef = doc(firestore, "users", currentUser.uid);

  const { data: currentUserDoc } = useFirestoreDocData(currentUserDocRef);
  const { data: sentByUserDoc } = useFirestoreDocData(message.sentBy);

  const messageFlexStyle =
    currentUserDoc === sentByUserDoc
      ? styles["message--currentUser"]
      : styles["message--activeUser"];

  const profilePicture =
    currentUserDoc === sentByUserDoc
      ? currentUser.photoURL
      : activeUser.photoURL;

  return (
    <div className={`${styles.message} ${messageFlexStyle}`}>
      <div className={styles.message__photo}>
        <img src={profilePicture} />
      </div>
      <div className={styles.message__container}>
        <div className={styles.message__text}>
          <p>{message.messageText}</p>
        </div>
        <div className={styles.message__timestamp}>{timestamp}</div>
      </div>
    </div>
  );
};

export default Message;
