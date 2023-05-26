import { FC, useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";
import { UsersProps } from "../../lib/types";
import { getNotCurrentUsersQuery } from "../../lib/firebaseQueries";
import { isEmptyObject } from "../../lib/isEmptyObject";

import User from "../User";

import styles from "./Users.module.css";

const Users: FC<UsersProps> = ({ currentUser, setActiveUser, activeUser }) => {
  const firestore = useFirestore();

  const usersCollection = collection(firestore, "users");
  const usersQuery = getNotCurrentUsersQuery(usersCollection, currentUser.uid);
  const { data: users } = useFirestoreCollectionData(usersQuery);

  useEffect(() => {
    if (isEmptyObject(activeUser) && users) {
      const defaultActiveUser = users[0];
      setActiveUser(defaultActiveUser);
    }
  }, [activeUser, setActiveUser, users]);

  if (users) {
    return (
      <div className={styles.users}>
        <div className={styles.users__header}>Users</div>
        {users.map((user, index) => {
          return <User key={index} setActiveUser={setActiveUser} user={user} />;
        })}
      </div>
    );
  } else {
    return <span>loading...</span>;
  }
};

export default Users;
