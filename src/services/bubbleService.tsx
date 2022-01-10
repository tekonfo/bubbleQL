import { Column } from 'react-table'
import { BubbleRouting } from '../routing/routing'
export default class BubbleService {
  getKeys(
    lists: Array<object>,
    routing: BubbleRouting,
    refreshFunc: Function,
  ): Column<any>[] {
    if (!lists) return []
    if (lists.length == 0) return []
    // TODO: keyを全部の行のsetにする
    const keys: Array<string> = Object.keys(lists[0])
    const keysObj = keys.map(val => ({
      Header: val,
      accessor: val,
    }))
    keysObj.push(this.duplicateCol(routing, refreshFunc))
    keysObj.push(this.deleteCol(routing, refreshFunc))
    return keysObj
  }

  getBody(lists: Array<object>): Array<object> {
    return lists
  }

  private duplicateCol(routing: BubbleRouting, refreshFunc: Function): any {
    return {
      Header: 'Duplicate',
      id: 'duplicate',
      accessor: (str: any) => 'duplicate',
      // TODO: tableインスタンスが入っている
      // https://react-table.tanstack.com/docs/api/useTable#instance-properties
      Cell: ({ cell }: { cell: any }) => (
        <button onClick={() => this.duplicateRow(routing, cell, refreshFunc)}>
          Duplicate
        </button>
      ),
    }
  }

  private deleteCol(routing: BubbleRouting, refreshFunc: Function): any {
    return {
      Header: 'Delete',
      id: 'delete',
      accessor: (str: any) => 'delete',
      Cell: (props: any) => (
        <button onClick={() => this.deleteRow(routing, props, refreshFunc)}>
          Delete
        </button>
      ),
    }
  }

  private async duplicateRow(
    routing: BubbleRouting,
    cell: any,
    refreshFunc: Function,
  ) {
    const id = cell.row.values._id
    const data = await routing.getDataById(id)
    await routing.createNewThing(data)
    refreshFunc()
  }

  private async deleteRow(
    routing: BubbleRouting,
    cell: any,
    refreshFunc: Function,
  ) {
    const id = cell.row.values._id
    const res = await routing.deleteDataById(id)
    console.log(res)
    refreshFunc()
  }
}
