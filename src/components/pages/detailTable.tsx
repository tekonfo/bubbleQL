// ReactDOM.createPortal()の第一引数に指定するコンポーネントです。
// Atomic Designのpages層に相当しますが、ただtemplatesを呼び出すだけのwrapperとなっています。
import { useEffect, useMemo, useState, useContext } from 'react'
import { TableInstance, useTable } from 'react-table'
import { BubbleRouting } from '../../routing/routing'
import BubbleService from '../../services/bubbleService'
import { BubbleApplicationContext } from '../../store/bubbleProjectContext'
import { BubbleTableContext } from '../../store/bubbleTableContext'
import { BubbleTableSettingContext } from '../../store/bubbleTableSettingContext'
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
  const bubbleTableSettingContext = useContext(BubbleTableSettingContext)

  useEffect(() => {
    const getData = async () => {
      const { appName, apiToken } =
        bubbleApplicationContext.bubbleApplicationContext
      if (appName === '' || apiToken === '') {
        return
      }

      const routing = new BubbleRouting(
        bubbleApplicationContext,
        bubbleTableSettingContext,
      )
      const data = await routing.fetcher(routing.route())
      const bubbleService = new BubbleService()
      setBodyData(bubbleService.getBody(data?.results))
      setColumnsData(bubbleService.getKeys(data?.results))
    }
    getData()
  }, [bubbleApplicationContext, bubbleTableSettingContext])

  return (
    <>
      <BubbleTableContext.Provider value={value}>
        <DetailTableTemplate />
      </BubbleTableContext.Provider>
    </>
  )
}
