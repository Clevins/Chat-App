import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { SetStateAction } from "react";

export type UsersProps = {
  currentUser: User;
  activeUser: DocumentData;
  setActiveUser: React.Dispatch<SetStateAction<DocumentData>>;
};

export type UserProps = {
  user: DocumentData;
  setActiveUser: React.Dispatch<SetStateAction<DocumentData>>;
};

export type MessagesProps = {
  activeUser: DocumentData;
  currentUser: User;
};

export type MessageProps = {
  currentUser: User;
  activeUser: DocumentData;
  message: DocumentData;
};
