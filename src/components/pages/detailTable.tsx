// ReactDOM.createPortal()の第一引数に指定するコンポーネントです。
// Atomic Designのpages層に相当しますが、ただtemplatesを呼び出すだけのwrapperとなっています。
import { useEffect, useMemo, useState, useContext, createContext } from 'react'
import { TableInstance, useTable } from 'react-table'
import { BubbleRouting } from '../../routing/routing'
import BubbleService from '../../services/bubbleService'
import { BubbleApplicationContext } from '../../store/bubbleProjectContext'
import { BubbleTableContext } from '../../store/bubbleTableContext'
import { BubbleTableSettingContext } from '../../store/bubbleTableSettingContext'
import { IsRefreshBubbleTableContext } from '../../store/refreshBubbleTableContext'
import { defaultColumn } from '../molecules/table/defaultCell'
import DetailTableTemplate from '../templates/detailTableTemplate'

export const IsFetchErrorContext = createContext(false)

export default function DetailTable() {
  const [columnsData, setColumnsData] = useState([] as any[])
  const [bodyData, setBodyData] = useState([] as any[])

  const columns = useMemo(() => columnsData, [columnsData])
  const resData = useMemo(() => bodyData, [bodyData])

  const bubbleApplicationContext = useContext(BubbleApplicationContext)
  const bubbleTableSettingContext = useContext(BubbleTableSettingContext)
  const isRefreshBubbleTableContext = useContext(IsRefreshBubbleTableContext)

  const routing = new BubbleRouting(
    bubbleApplicationContext.bubbleApplicationContext,
    bubbleTableSettingContext.bubbleTableSettingContextTypes[
      bubbleTableSettingContext.index
    ],
  )

  const obj = {
    columns,
    data: resData,
    defaultColumn,
  }
  const tableIns: TableInstance<object> = useTable(obj)

  const [table, setTable] = useState(tableIns)
  const value = { table, setTable }
  const [isError, setIsError] = useState(false)
  const IsFetchErrorContext = createContext(isError)

  useEffect(() => {
    const getData = async () => {
      const { appName, apiToken } =
        bubbleApplicationContext.bubbleApplicationContext
      if (appName === '' || apiToken === '') {
        return
      }

      const routing = new BubbleRouting(
        bubbleApplicationContext.bubbleApplicationContext,
        bubbleTableSettingContext.bubbleTableSettingContextTypes[
          bubbleTableSettingContext.index
        ],
      )
      let data
      try {
        data = await routing.fetcher(routing.route())
      } catch {
        // errorであることを通知するcontextが必要
        console.log('error')
        setIsError(true)
      }

      const bubbleService = new BubbleService()
      setBodyData(bubbleService.getBody(data?.results))
      const keys = bubbleService.getKeys(data?.results, routing, () => {
        isRefreshBubbleTableContext.setIsRefreshBubbleTableContextType({
          isRefreshTable: true,
        })
      })
      setColumnsData(keys)
    }
    getData()

    if (
      isRefreshBubbleTableContext.isRefreshBubbleTableContextType.isRefreshTable
    ) {
      isRefreshBubbleTableContext.setIsRefreshBubbleTableContextType({
        isRefreshTable: false,
      })
    }
  }, [
    bubbleApplicationContext.bubbleApplicationContext,
    bubbleTableSettingContext.bubbleTableSettingContextTypes,
    bubbleTableSettingContext.index,
    isRefreshBubbleTableContext,
  ])

  return (
    <>
      <BubbleTableContext.Provider value={value}>
        <IsFetchErrorContext.Provider value={isError}>
          <DetailTableTemplate />
        </IsFetchErrorContext.Provider>
      </BubbleTableContext.Provider>
    </>
  )
}
