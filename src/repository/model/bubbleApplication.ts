import { DocumentSnapshot, doc, setDoc, getDoc } from 'firebase/firestore'
import { BubbleApplicationType } from '../../store/bubbleProjectContext'
import { createCollection } from '../firestore'

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
