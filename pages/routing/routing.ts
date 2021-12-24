import { BubbleBasicData } from '../model/bubbleBasicData'
import { BubbleApplicationContextType } from '../store/bubbleProjectContext'
import { getFetch } from '../util/fetch'
abstract class Routing {
  abstract route(): string
  abstract fetcher(url: string): any
}

export class BubbleRouting extends Routing {
  applicationContext: BubbleApplicationContextType
  constructor(context: BubbleApplicationContextType) {
    super()
    this.applicationContext = context
  }
  route(): string {
    const params = {
      appName: this.applicationContext.appName,
      apiToken: this.applicationContext.apiToken,
      // TODO: ここcontextで持つようにする
      tableName: 'student',
      isTestMode: this.applicationContext.isTestMode.toString(),
    }
    const query_params = new URLSearchParams(params)
    return 'http://localhost:3000/api/bubble?' + query_params
  }
  async fetcher(url: string): Promise<BubbleBasicData | null> {
    const fetch = getFetch()
    const response = await fetch(url)
    // ちょっと面倒なので直接fetchする。API routesつかわない

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
