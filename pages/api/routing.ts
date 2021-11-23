import { BubbleBasicData } from './bubble'
abstract class Routing {
  abstract route(): string
  abstract fetcher(): any
  abstract typeCheck(response: any): any
}

export class BubbleRouting extends Routing {
  route(): string {
    return '/api/bubble'
  }
  async fetcher(...args: any[]): Promise<BubbleBasicData | null> {
    const response = await fetch(args[0], args[1])
    return response.json()
  }

  isBubbleBasicData = (item: any): item is BubbleBasicData => {
    return item !== null && item !== undefined
  }

  // TODO: ホントは型ガードがしたかったんだけど、まだ出来ていない
  typeCheck(response: any): any {
    return response
  }
}
