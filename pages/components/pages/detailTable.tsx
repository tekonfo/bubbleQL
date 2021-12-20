// ReactDOM.createPortal()の第一引数に指定するコンポーネントです。
// Atomic Designのpages層に相当しますが、ただtemplatesを呼び出すだけのwrapperとなっています。
import { useEffect, useMemo, useState, useContext } from 'react'
import { TableInstance, useTable } from 'react-table'
import { BubbleTableContext } from '../..'
import { BubbleRouting } from '../../routing/routing'
import BubbleService from '../../services/bubbleService'
import { BubbleApplicationContext } from '../../store/bubbleProjectContext'
import DetailTableTemplate from '../templates/detailTableTemplate'

export default function DetailTable() {
  const [columnsData, setColumnsData] = useState([] as any[])
  const [bodyData, setBodyData] = useState([] as any[])

  const columns = useMemo(() => columnsData, [columnsData])
  const resData = useMemo(() => bodyData, [bodyData])

  const tableIns: TableInstance<object> = useTable({
    columns,
    data: resData,
  })

  const [table, setTable] = useState(tableIns)
  const value = { table, setTable }

  const bubbleApplicationContext = useContext(BubbleApplicationContext)

  // bubbleApplicationContextに影響が出たら、更新する
  useEffect(() => {
    const getData = async () => {
      const routing = new BubbleRouting(bubbleApplicationContext)
      const data = await routing.fetcher(routing.route())
      const bubbleService = new BubbleService()
      setBodyData(bubbleService.getBody(data?.results))
      setColumnsData(bubbleService.getKeys(data?.results))
    }
    getData()
  }, [bubbleApplicationContext])

  return (
    <>
      <BubbleTableContext.Provider value={value}>
        <DetailTableTemplate />
      </BubbleTableContext.Provider>
    </>
  )
}
