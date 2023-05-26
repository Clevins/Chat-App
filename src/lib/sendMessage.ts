import {
  DocumentReference,
  DocumentData,
  setDoc,
  doc,
  collection,
  Timestamp,
  Firestore,
} from "firebase/firestore";

const sendMessage = async (
  firestore: Firestore,
  message: string,
  currentUser: DocumentReference<DocumentData>,
  activeUser: DocumentReference<DocumentData>
) => {
  try {
    return await setDoc(doc(collection(firestore, "message")), {
      sentBy: currentUser,
      sentTo: activeUser,
      sentAt: Timestamp.fromDate(new Date()),
      messageText: message,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMessage;
