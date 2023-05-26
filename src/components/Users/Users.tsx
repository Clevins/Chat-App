import { User as UserType } from "firebase/auth";
import { collection, query, where, DocumentData } from "firebase/firestore";
import { FC, SetStateAction, useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import User from "../User";

import styles from "./Users.module.css";

type UsersProps = {
  currentUser: UserType;
  activeUser: DocumentData;
  setActiveUser: React.Dispatch<SetStateAction<DocumentData>>;
};

const Users: FC<UsersProps> = ({ currentUser, setActiveUser, activeUser }) => {
  const firestore = useFirestore();

  const usersCollection = collection(firestore, "users");
  const usersQuery = query(
    usersCollection,
    where("uid", "!=", currentUser.uid)
  );
  const { data: users } = useFirestoreCollectionData(usersQuery);

  useEffect(() => {
    if (Object.keys(activeUser).length == 0 && users) {
      setActiveUser(users[0]);
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
