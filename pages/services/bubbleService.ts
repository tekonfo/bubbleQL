export default class BubbleService {
  getKeys(lists: Array<object>): Array<any> {
    if (lists.length == 0) return []
    // TODO: keyを全部の行のsetにする
    const keys: Array<string> = Object.keys(lists[0])
    const keysObj = keys.map(val => ({
      Header: val,
      accessor: val,
    }))
    return keysObj
  }
  getBody(lists: Array<object>): Array<object> {
    return lists
  }
}
