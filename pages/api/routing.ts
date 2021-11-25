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
    const json: BubbleBasicData = await response.json()
    if (json === null) return null
    return json
  }

  isBubbleBasicData = (item: any): item is BubbleBasicData => {
    return item !== null && item !== undefined
  }
}
