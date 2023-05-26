import { FC } from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { auth, provider } from "../../firebase-config";
import googgleIcon from "../../../public/assets/icons8-google-96.png";

import styles from "./Login.module.css";

const Login: FC = () => {
  const firestore = useFirestore();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      console.error(err);
    }
  };

  const logIn = async () => {
    const user = await signInWithGoogle();

    if (user) {
      setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      });
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <img
          src={googgleIcon}
          className={styles.login__icon}
          alt="Google Icon"
        />

        <button onClick={logIn} className={styles.login__button}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
