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
    bubbleApplicationTypeContext: BubbleApplicationType,
    tableContext: BubbleTableSettingContextType,
  ) {
    super()
    this.applicationContext = bubbleApplicationTypeContext
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

  private postRoute(): string {
    return `https://${this.applicationContext.appName}.bubbleapps.io/version-test/api/1.1/obj/${this.tableSettingContext.tableName}`
  }

  private detailRoute(id: string): string {
    return `https://${this.applicationContext.appName}.bubbleapps.io/version-test/api/1.1/obj/${this.tableSettingContext.tableName}/${id}`
  }

  private updateRoute(id: string): string {
    return `https://${this.applicationContext.appName}.bubbleapps.io/version-test/api/1.1/obj/${this.tableSettingContext.tableName}/${id}`
  }

  private deleteRoute(id: string): string {
    return `https://${this.applicationContext.appName}.bubbleapps.io/version-test/api/1.1/obj/${this.tableSettingContext.tableName}/${id}`
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
    delete data['_id']
    delete data['Created Date']
    delete data['Created By']
    delete data['Modified Date']

    const cred = process.env.NEXT_PUBLIC_BUBBLE_API_KEY
    const res = await window.fetch(this.postRoute(), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${cred}`,
      },
    })
    const result = await res.json()
    return result.response
  }

  async getDataById(id: string): Promise<any> {
    const res = await window.fetch(this.detailRoute(id))
    const result = await res.json()
    return result.response
  }

  async deleteDataById(id: string): Promise<any> {
    const cred = process.env.NEXT_PUBLIC_BUBBLE_API_KEY
    const res = await window.fetch(this.deleteRoute(id), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cred}`,
      },
    })
    return res
  }

  async updateDataById(id: string, data: any): Promise<any> {
    const cred = process.env.NEXT_PUBLIC_BUBBLE_API_KEY
    const res = await window.fetch(this.updateRoute(id), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cred}`,
      },
      body: JSON.stringify(data),
    })
    return res
  }

  getKeys() {}

  isBubbleBasicData = (item: any): item is BubbleBasicData => {
    return item !== null && item !== undefined
  }
}
