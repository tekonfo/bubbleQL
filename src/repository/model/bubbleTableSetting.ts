import {
  DocumentSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'
import {
  BubbleTableSettingContextType,
  BubbleTableSettingEntity,
} from '../../store/bubbleTableSettingContext'
import { createCollection } from '../firestore'

export const bubbleTableSettingCol = (uid: string, appId: string) => {
  return createCollection<BubbleTableSettingEntity>(
    `User/${uid}/Application/${appId}/Table`,
  )
}

export const getBubbleTableSettings = async (
  uid: string,
  appId: string,
): Promise<Array<BubbleTableSettingContextType>> => {
  const bookDocs = await getDocs(bubbleTableSettingCol(uid, appId))
  const data: BubbleTableSettingContextType[] = []
  bookDocs.forEach(x => data.push({ id: x.id, data: x.data() }))
  return data
}

export const getBubbleTableSetting = async (
  uid: string,
  appId: string,
  id: string,
): Promise<DocumentSnapshot<BubbleTableSettingEntity>> => {
  const ref = doc(bubbleTableSettingCol(uid, appId), id)
  return await getDoc(ref)
}

export const upsertBubbleTableSetting = async (
  uid: string,
  appId: string,
  data: BubbleTableSettingEntity,
  id?: string,
) => {
  let ref
  if (id) {
    ref = doc(bubbleTableSettingCol(uid, appId), id)
  } else {
    ref = doc(bubbleTableSettingCol(uid, appId))
  }
  await setDoc(ref, data)
  return
}

export const deleteBubbleTableSetting = async (
  uid: string,
  appId: string,
  id: string,
) => {
  const ref = doc(bubbleTableSettingCol(uid, appId), id)
  await deleteDoc(ref)
  return
}
