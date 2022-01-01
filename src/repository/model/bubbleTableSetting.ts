import { DocumentSnapshot, doc, setDoc, getDoc } from 'firebase/firestore'
import { BubbleTableSettingContextType } from '../../store/bubbleTableSettingContext'
import { createCollection } from '../firestore'

export const bubbleTableSettingCol =
  createCollection<BubbleTableSettingContextType>('Application')

export const setBubbleTableSetting = async (
  id: string,
  data: BubbleTableSettingContextType,
) => {
  const ref = doc(bubbleTableSettingCol, id)
  await setDoc(ref, data)
}

export const getBubbleTableSetting = async (
  id: string,
): Promise<DocumentSnapshot<BubbleTableSettingContextType>> => {
  const ref = doc(bubbleTableSettingCol, id)
  return await getDoc(ref)
}
