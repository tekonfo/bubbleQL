import { BubbleBasicData } from '../model/bubbleBasicData'
import {
  BubbleApplicationContextType,
  BubbleApplicationType,
} from '../store/bubbleProjectContext'
import { BubbleTableSettingContextType } from '../store/bubbleTableSettingContext'
import { getFetch } from '../util/fetch'
abstract class Routing {
  abstract route(): string
  abstract fetcher(url: string): any
}

export class BubbleRouting extends Routing {
  applicationContext: BubbleApplicationType
  tableSettingContext: BubbleTableSettingContextType
  constructor(
    context: BubbleApplicationContextType,
    tableContext: BubbleTableSettingContextType,
  ) {
    super()
    this.applicationContext = context.bubbleApplicationContext
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

  postRoute(): string {
    return `https://${this.applicationContext.appName}.bubbleapps.io/api/1.1/obj/${this.tableSettingContext.tableName}`
  }

  detailRoute(id: string): string {
    return `https://${this.applicationContext.appName}.bubbleapps.io/api/1.1/obj/${this.tableSettingContext.tableName}/${id}`
  }

  async fetcher(url: string): Promise<BubbleBasicData | null> {
    const fetch = getFetch()
    const response = await fetch(url)
    const json = await response.json()
    if (json === null) return null
    return json
  }

  // clientサイドでなければ動かない
  async createNewThing(data: any): Promise<any> {
    const res = await window.fetch(this.postRoute(), {
      method: 'POST',
      body: data,
    })
    return res
  }

  async getDataById(id: string): Promise<any> {
    const res = await window.fetch(this.detailRoute(id))
    return res
  }

  async deleteDataById(id: string): Promise<any> {}

  getKeys() {}

  isBubbleBasicData = (item: any): item is BubbleBasicData => {
    return item !== null && item !== undefined
  }
}
