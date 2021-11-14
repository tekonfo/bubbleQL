export default class BubbleResponse {
  cursor: number
  remaining: number
  count: number
  results: any

  constructor(json: any) {
    this.cursor = json['response']['cursor']
    this.results = json['response']['results']
    this.remaining = json['response']['remaining']
    this.count = json['response']['count']
  }
}
