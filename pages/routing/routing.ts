import { BubbleBasicData } from '../model/bubbleBasicData'
import { BubbleApplicationContextType } from '../store/bubbleProjectContext'
import { BubbleTableSettingContextType } from '../store/bubbleTableSettingContext'
import { getFetch } from '../util/fetch'
abstract class Routing {
  abstract route(): string
  abstract fetcher(url: string): any
}

export class BubbleRouting extends Routing {
  applicationContext: BubbleApplicationContextType
  tableSettingContext: BubbleTableSettingContextType
  constructor(
    context: BubbleApplicationContextType,
    tableContext: BubbleTableSettingContextType,
  ) {
    super()
    this.applicationContext = context
    this.tableSettingContext = tableContext
  }
  route(): string {
    const params = {
      appName: this.applicationContext.appName,
      apiToken: this.applicationContext.apiToken,
      tableName: this.tableSettingContext.tableName,
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

  isBubbleBasicData = (item: any): item is BubbleBasicData => {
    return item !== null && item !== undefined
  }
}
