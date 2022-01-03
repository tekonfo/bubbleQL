import {
  DocumentSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { BubbleApplicationType } from '../../store/bubbleProjectContext'
import { createCollection } from '../firestore'

export const bubbleApplicationCol = (uid: string) => {
  return createCollection<BubbleApplicationType>(`User/${uid}/Application`)
}

export const setBubbleApplication = async (
  uid: string,
  id: string,
  data: BubbleApplicationType,
) => {
  const ref = doc(bubbleApplicationCol(uid), id)
  await setDoc(ref, data)
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
): Promise<Array<BubbleApplicationType>> => {
  const applications = await getDocs(bubbleApplicationCol(uid))
  const data: BubbleApplicationType[] = []
  applications.forEach(x => data.push(x.data()))
  return data
}
