import { FC } from "react";
import { getAuth, signOut } from "firebase/auth";

import styles from "./Header.module.css";
import { useSigninCheck } from "reactfire";

const Header: FC = () => {
  const auth = getAuth();
  const { data: signInCheckResult } = useSigninCheck();

  return (
    <div className={styles.header}>
      <div className={styles.header__title}>Chat App</div>

      {signInCheckResult.signedIn && (
        <button
          className={styles.header__signOut}
          onClick={() => {
            signOut(auth);
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
