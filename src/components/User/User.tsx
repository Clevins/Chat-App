import { DocumentData } from "firebase/firestore";
import { FC, SetStateAction } from "react";

import icon from "../../../public/assets/icons8-arrow-50.png";
import styles from "./User.module.css";

type UserProps = {
  user: DocumentData;
  setActiveUser: React.Dispatch<SetStateAction<DocumentData>>;
};

const User: FC<UserProps> = ({ user, setActiveUser }) => {
  return (
    <button onClick={() => setActiveUser(user)}>
      <div className={styles.user}>
        <div className={styles.user__info}>
          <div className={styles.user__photo}>
            <img src={user.photoURL} />
          </div>

          <div className={styles.user__name}>{user.displayName}</div>
        </div>
        <div className={styles.user__icon}>
          <img src={icon} />
        </div>
      </div>
    </button>
  );
};

export default User;
