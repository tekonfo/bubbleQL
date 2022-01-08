import { createContext, useContext, useState } from 'react'
export type IsRefreshBubbleTableType = {
  isRefreshTable: boolean
}
export type IsRefreshBubbleTableContextType = {
  isRefreshBubbleTableContextType: IsRefreshBubbleTableType
  setIsRefreshBubbleTableContextType: React.Dispatch<
    React.SetStateAction<IsRefreshBubbleTableType>
  >
}
export const IsRefreshBubbleTableContext = createContext(
  {} as IsRefreshBubbleTableContextType,
)
export const BuildIsRefreshBubbleTableContext =
  (): IsRefreshBubbleTableContextType => {
    const [
      isRefreshBubbleTableContextType,
      setIsRefreshBubbleTableContextType,
    ] = useState<IsRefreshBubbleTableType>({
      isRefreshTable: false,
    })
    return {
      isRefreshBubbleTableContextType,
      setIsRefreshBubbleTableContextType,
    }
  }

export const RefreshBubbleTableContext = () => {
  const isRefreshBubbleTableContext = useContext(IsRefreshBubbleTableContext)
  isRefreshBubbleTableContext.setIsRefreshBubbleTableContextType({
    isRefreshTable: true,
  })
}
