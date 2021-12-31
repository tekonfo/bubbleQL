import {
  getFirestore,
  collection,
  DocumentData,
  CollectionReference,
  DocumentSnapshot,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { Firebase } from '../firebase'
import { BubbleApplicationType } from '../store/bubbleProjectContext'

// Export firestore incase we need to access it directly
export const firestore = getFirestore()

// https://javascript.plainenglish.io/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
// ↑この記事を参考にしている

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

// export all your collections
export const bubbleApplicationCol =
  createCollection<BubbleApplicationType>('Application')

export const setBubbleApplication = async (
  id: string,
  data: BubbleApplicationType,
) => {
  const ref = doc(bubbleApplicationCol, id)
  await setDoc(ref, data)
}

export const getBubbleApplication = async (
  id: string,
): Promise<DocumentSnapshot<BubbleApplicationType>> => {
  const ref = doc(bubbleApplicationCol, id)
  return await getDoc(ref)
}
