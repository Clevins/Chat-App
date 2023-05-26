import { FC } from "react";
import icon from "../../../public/assets/icons8-arrow-50.png";
import { UserProps } from "../../lib/types";

import styles from "./User.module.css";

const User: FC<UserProps> = ({ user, setActiveUser }) => {
  return (
    <button onClick={() => setActiveUser(user)}>
      <div className={styles.user}>
        <div className={styles.user__info}>
          <div className={styles.user__photo}>
            <img src={user.photoURL} alt="Profile Picture" />
          </div>
          <div className={styles.user__name}>{user.displayName}</div>
        </div>
        <div className={styles.user__icon}>
          <img src={icon} alt="Arrow Icon" />
        </div>
      </div>
    </button>
  );
};

export default User;
