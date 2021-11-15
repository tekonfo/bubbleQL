import BubbleResponse from '../../model/bubble/dataResponse'

export default class Request {
  url: string
  method: string = 'get'
  apiToken: string

  constructor(url: string, method: string = 'get') {
    this.url = url
    // 環境変数からtokenを取得
    this.apiToken = ''
  }

  // 制約達
  // Note: Our GET API calls have a limit of 50,000 items (10 million for Dedicated).

  async fetch(): Promise<BubbleResponse> {
    const res = await fetch(this.url)
    // 200系以外をなんとかしないといけない

    const data = await res.json()
    return new BubbleResponse(data)
  }
}
