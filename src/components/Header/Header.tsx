import { FC } from "react";
import { getAuth, signOut } from "firebase/auth";

import styles from "./Header.module.css";

const Header: FC = () => {
  const auth = getAuth();

  return (
    <div className={styles.header}>
      <div className={styles.header__title}>Chat App</div>
      <button
        className={styles.header__signOut}
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
