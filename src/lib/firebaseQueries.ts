import {
  and,
  CollectionReference,
  DocumentData,
  DocumentReference,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getNotCurrentUsersQuery = (
  col: CollectionReference<DocumentData>,
  currentUid: string
) => {
  return query(col, where("uid", "!=", currentUid));
};

export const getMessagesQuery = (
  col: CollectionReference<DocumentData>,
  currentUser: DocumentReference<DocumentData>,
  activeUser: DocumentReference<DocumentData>
) => {
  return query(
    col,
    or(
      and(
        where("sentBy", "==", currentUser),
        where("sentTo", "==", activeUser)
      ),
      and(where("sentBy", "==", activeUser), where("sentTo", "==", currentUser))
    ),
    orderBy("sentAt", "asc")
  );
};
