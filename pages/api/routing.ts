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
    return response.json()
  }
}
