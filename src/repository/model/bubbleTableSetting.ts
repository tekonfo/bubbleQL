import {
  DocumentSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore'
import { BubbleTableSettingContextType } from '../../store/bubbleTableSettingContext'
import { createCollection } from '../firestore'

export const bubbleTableSettingCol = (appId: string) => {
  return createCollection<BubbleTableSettingContextType>(
    `Application/${appId}/Table`,
  )
}

export const setBubbleTableSetting = async (
  appId: string,
  id: string,
  data: BubbleTableSettingContextType,
) => {
  const ref = doc(bubbleTableSettingCol(appId), id)
  await setDoc(ref, data)
}

export const getBubbleTableSettings = async (
  appId: string,
): Promise<Array<BubbleTableSettingContextType>> => {
  const bookDocs = await getDocs(bubbleTableSettingCol(appId))
  const data: BubbleTableSettingContextType[] = []
  bookDocs.forEach(x => data.push(x.data()))
  return data
}

export const getBubbleTableSetting = async (
  appId: string,
  id: string,
): Promise<DocumentSnapshot<BubbleTableSettingContextType>> => {
  const ref = doc(bubbleTableSettingCol(appId), id)
  return await getDoc(ref)
}
