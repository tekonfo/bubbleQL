// ReactDOM.createPortal()の第一引数に指定するコンポーネントです。
// Atomic Designのpages層に相当しますが、ただtemplatesを呼び出すだけのwrapperとなっています。
import { useEffect, useMemo, useState } from 'react'
import { TableInstance, useTable } from 'react-table'
import { BubbleTableContext } from '../..'
import { BubbleRouting } from '../../routing/routing'
import BubbleService from '../../services/bubbleService'
import DetailTableTemplate from '../templates/detailTableTemplate'

export default function DetailTable() {
  let columnsData: any[] = []
  let bodyData: any[] = []

  const columns = useMemo(() => columnsData, [])
  const resData = useMemo(() => bodyData, [])

  const tableIns: TableInstance<object> = useTable({
    columns,
    data: resData,
  })

  const [table, setTable] = useState(tableIns)
  const value = { table, setTable }

  useEffect(() => {
    const getData = async () => {
      console.log('test')
      const routing = new BubbleRouting({
        apiToken: '',
        workFlowApiUrl: '',
        dataApiUrl: '',
        enableDataTables: [],
      })
      const data = await routing.fetcher(routing.route())
      const bubbleService = new BubbleService()
      columnsData = bubbleService.getKeys(data?.results)
      bodyData = bubbleService.getBody(data?.results)
    }
    console.log('test')
    getData()
  }, [])

  return (
    <>
      <BubbleTableContext.Provider value={value}>
        <DetailTableTemplate />
      </BubbleTableContext.Provider>
    </>
  )
}
