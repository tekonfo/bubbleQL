export default class BubbleResponse {
  cursor: number
  remaining: number
  count: number
  results: any

  constructor(data: any) {
    console.log(data)
    this.cursor = data['response']['cursor']
    this.results = data['response']['results']
    this.remaining = data['response']['remaining']
    this.count = data['response']['count']
  }
}
