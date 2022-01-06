import { route } from 'next/dist/server/router'
import { Column } from 'react-table'
export default class BubbleService {
  getKeys(lists: Array<object>): Column<any>[] {
    if (!lists) return []
    if (lists.length == 0) return []
    // TODO: keyを全部の行のsetにする
    const keys: Array<string> = Object.keys(lists[0])
    const keysObj = keys.map(val => ({
      Header: val,
      accessor: val,
    }))
    keysObj.push(this.duplicateCol())
    keysObj.push(this.deleteCol())
    return keysObj
  }
  getBody(lists: Array<object>): Array<object> {
    return lists
  }

  private duplicateCol(): any {
    return {
      Header: 'Duplicate',
      id: 'duplicate',
      accessor: (str: any) => 'duplicate',
      // TODO: tableインスタンスが入っている
      // https://react-table.tanstack.com/docs/api/useTable#instance-properties
      Cell: ({ cell }: { cell: any }) => (
        <button onClick={() => this.duplicateRow(cell)}>Duplicate</button>
      ),
    }
  }
  private deleteCol(): any {
    return {
      Header: 'Delete',
      id: 'delete',
      accessor: (str: any) => 'delete',
      Cell: (props: any) => (
        <button onClick={() => this.deleteRow(props)}>Delete</button>
      ),
    }
  }

  private duplicateRow(cell: any) {
    const id = cell.row.values._id
    // routerを持ってくる

    console.log(cell)
  }

  private deleteRow(props: any) {
    console.log(props)
  }
}
