export class BubbleBasicData {
  name: string
  // results: Array<Map<any, any>>
  results: any
  constructor(obj: any) {
    this.name = obj.name
    this.results = obj.results
    // // TODO: これリファクタしないとなぁ
    // const objectToMap = (
    //   object: { [s: string]: unknown } | ArrayLike<unknown>,
    // ) => Object.entries(object).reduce((l, [k, v]) => l.set(k, v), new Map())
    // this.results = obj.results.map(
    //   (x: ArrayLike<unknown> | { [s: string]: unknown }) => objectToMap(x),
    // )
  }
}
