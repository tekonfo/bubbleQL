import React from 'react'
import ApplicationIndexTemplate from '../src/components/templates/applicationIndexTemplate'
import {
  BuildIsRefreshBubbleTableContext,
  IsRefreshBubbleTableContext,
} from '../src/store/refreshBubbleTableContext'

const Home = () => {
  // TODO: ほんとはBubbleTableではないのでまずいが、refreshするだけなのでとりあえず使っている。
  // interfaceで共通化するべき？
  const isRefreshBubbleTableTypeContextValue =
    BuildIsRefreshBubbleTableContext()

  return (
    <>
      <IsRefreshBubbleTableContext.Provider
        value={isRefreshBubbleTableTypeContextValue}
      >
        <ApplicationIndexTemplate />
      </IsRefreshBubbleTableContext.Provider>
    </>
  )
}

export default Home
