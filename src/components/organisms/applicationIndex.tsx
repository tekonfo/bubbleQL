import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { listenAuthState } from '../../auth/auth'
import {
  deleteBubbleApplication,
  getBubbleApplications,
  setBubbleApplication,
} from '../../repository/model/bubbleApplication'
import { BubbleApplicationType } from '../../store/bubbleProjectContext'
import { CurrentUserContext } from '../../store/currentUserContext'
import { IsRefreshBubbleTableContext } from '../../store/refreshBubbleTableContext'
import { BubbleApplicationDialog } from '../molecules/dialog/bubbleApplicationDialog'

export default function ApplicationIndex() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  listenAuthState(setCurrentUser)

  const {
    isRefreshBubbleTableContextType,
    setIsRefreshBubbleTableContextType,
  } = useContext(IsRefreshBubbleTableContext)

  const [data, setData] = useState([] as Array<any>)
  const [targetAppId, setTargetAppId] = useState('')

  const [application, setApplication] = useState({
    apiToken: '',
    appName: '',
    workFlowApiUrl: '',
    dataApiUrl: '',
    enableDataTables: [],
    isTestMode: false,
  } as BubbleApplicationType)

  const [editOpen, setEditOpen] = useState(false)
  const handleClose = (value: string) => {
    setEditOpen(false)
  }
  const setBubbleApplicationData = (
    uid: string,
    data: BubbleApplicationType,
    appId?: string,
  ) => {
    setBubbleApplication(uid, data, appId).then()
    handleClose('')
    setIsRefreshBubbleTableContextType({ isRefreshTable: true })
  }

  useEffect(() => {
    if (!isRefreshBubbleTableContextType) {
      return
    }
    if (!currentUser) {
      return
    }
    getBubbleApplications(currentUser.uid).then(d => {
      const arr: Array<Data> = []
      d.forEach(x => {
        arr.push({
          id: x.id,
          app: x.data(),
        })
      })
      setData(arr)
    })
    if (isRefreshBubbleTableContextType) {
      setIsRefreshBubbleTableContextType({ isRefreshTable: false })
    }
  }, [currentUser, isRefreshBubbleTableContextType.isRefreshTable])

  const handleEdit = (id: string, app: BubbleApplicationType) => {
    setTargetAppId(id)
    setApplication(app)
    setEditOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log(id)
    if (!currentUser) {
      throw new Error('ユーザー認証をして下さい')
    }
    deleteBubbleApplication(currentUser.uid, id)
    setIsRefreshBubbleTableContextType({ isRefreshTable: true })
  }

  // カラム
  const columns = [
    // 削除ボタン
    {
      field: 'deleteBtn',
      headerName: 'delete',
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params: GridRenderCellParams) => (
        <a onClick={e => handleDelete(params.row.id)} href="#">
          <MdDelete size={32} />
        </a>
      ),
    },
    // 詳細ボタン
    {
      field: 'editBtn',
      headerName: 'edit',
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params: GridRenderCellParams) => (
        <a onClick={() => handleEdit(params.row.id, params.row.app)} href="#">
          <MdEdit size={32} />
        </a>
      ),
    },
    {
      field: 'name',
      headerName: 'name',
      width: 250,
      sortable: false,
      // disableClickEventBubbling: true,
      renderCell: (params: GridRenderCellParams) => (
        <Link href={'/application/' + params.row.id}>
          <a>{params.row.app.appName}</a>
        </Link>
      ),
    },
  ]

  return (
    <>
      <DataGrid rows={data} columns={columns} autoHeight pageSize={10} />
      <BubbleApplicationDialog
        onClose={handleClose}
        open={editOpen}
        bubbleApplication={application}
        setBubbleApplication={setBubbleApplicationData}
        appId={targetAppId}
      />
    </>
  )
}

type Data = {
  id: string
  app: BubbleApplicationType
}
