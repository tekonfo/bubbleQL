import {
  DocumentSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore'
import { BubbleApplicationType } from '../../store/bubbleProjectContext'
import { createCollection } from '../firestore'

export const bubbleApplicationCol = (uid: string) => {
  return createCollection<BubbleApplicationType>(`User/${uid}/Application`)
}

export const setBubbleApplicationContextWithFireStore = (
  uid: string,
  appId: string,
  value: BubbleApplicationType,
  setBubbleApplicationContext: (
    value: React.SetStateAction<BubbleApplicationType>,
  ) => void,
) => {
  setBubbleApplicationContext(value)
  setBubbleApplication(uid, value, appId)
}

export const setBubbleApplication = async (
  uid: string,
  data: BubbleApplicationType,
  id?: string,
) => {
  console.log(uid)
  const col = bubbleApplicationCol(uid)
  console.log(col)
  if (id) {
    const ref = doc(col, id)
    await setDoc(ref, data)
  } else {
    const ref = doc(col)
    await setDoc(ref, data)
  }
}

export const getBubbleApplication = async (
  uid: string,
  id: string,
): Promise<DocumentSnapshot<BubbleApplicationType>> => {
  const ref = doc(bubbleApplicationCol(uid), id)
  return await getDoc(ref)
}

export const getBubbleApplications = async (
  uid: string,
): Promise<QuerySnapshot<BubbleApplicationType>> => {
  const applications = await getDocs(bubbleApplicationCol(uid))
  return applications
}
