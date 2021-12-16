import { BubbleBasicData } from '../model/bubbleBasicData'
import { getFetch } from '../util/fetch'
abstract class Routing {
  abstract route(): string
  abstract fetcher(url: string): any
}

export class BubbleRouting extends Routing {
  route(): string {
    return 'http://localhost:3000/api/bubble'
  }
  async fetcher(url: string): Promise<BubbleBasicData | null> {
    const fetch = getFetch()
    const response = await fetch(url)
    const json = await response.json()
    if (json === null) return null
    return json
  }
  getKeys() {}

  // TODO: THE・クソコード。Hooksの前で早期リターン出来ないらしいので、それに対しての暫定対応
  returnBubbleBasicData(data: any): BubbleBasicData {
    if (data === undefined) {
      return new BubbleBasicData({})
    }
    return data
  }

  isBubbleBasicData = (item: any): item is BubbleBasicData => {
    return item !== null && item !== undefined
  }
}
