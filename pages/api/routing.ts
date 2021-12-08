import { BubbleBasicData } from './bubble'
abstract class Routing {
  abstract route(): string
  abstract fetcher(): any
}

export class BubbleRouting extends Routing {
  route(): string {
    return '/api/bubble'
  }
  async fetcher(...args: any[]): Promise<BubbleBasicData | null> {
    const response = await fetch(args[0], args[1])
    // これ単純にinterfaceで教えてあげるだけだと理解しないんだな
    const json = await response.json()
    if (json === null) return null
    // これがどうやらサーバーサイドのコードなので、落ちている。
    // const data: BubbleBasicData = new BubbleBasicData(json)
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
