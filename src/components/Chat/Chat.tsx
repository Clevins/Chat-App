import { FC, useState } from "react";

import { DocumentData } from "firebase/firestore";
import { useSigninCheck, useUser } from "reactfire";
import { isEmptyObject } from "../../lib/isEmptyObject";

import Login from "../Login";
import Header from "../Header";
import Users from "../Users";
import Messages from "../Messages";

import styles from "./Chat.module.css";

const Chat: FC = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { data: user } = useUser();

  const [activeUser, setActiveUser] = useState<DocumentData>({});

  if (status === "loading") {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true && user) {
    return (
      <div className={styles.chat}>
        <Header />

        <div className={styles.chat__content}>
          <Users
            currentUser={user}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
          />

          {!isEmptyObject(activeUser) && (
            <Messages currentUser={user} activeUser={activeUser} />
          )}
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default Chat;
