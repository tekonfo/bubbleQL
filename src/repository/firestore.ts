import {
  getFirestore,
  collection,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore'

// Export firestore incase we need to access it directly
export const firestore = getFirestore()

// https://javascript.plainenglish.io/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
// ↑この記事を参考にしている

// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}
