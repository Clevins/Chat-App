import { FC } from "react";
import { getAuth } from "firebase/auth";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";

import Chat from "./components/Chat";

import "./App.css";

const App: FC = () => {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <Chat />
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default App;
