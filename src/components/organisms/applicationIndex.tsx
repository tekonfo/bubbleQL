import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { listenAuthState } from '../../auth/auth'
import { getBubbleApplications } from '../../repository/model/bubbleApplication'
import { CurrentUserType } from '../../store/currentUserContext'

export default function ApplicationIndex() {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null)
  listenAuthState(setCurrentUser)

  const [data, setData] = useState([] as Array<any>)

  useEffect(() => {
    if (!currentUser) {
      return
    }
    getBubbleApplications(currentUser.uid).then(d => {
      const arr: Array<any> = []
      d.forEach(x => {
        arr.push({
          id: x.id,
          name: x.data().appName,
        })
      })
      setData(arr)
    })
  }, [currentUser])

  const handleEdit = () => {
    console.log('aaa')
  }

  const handleDelete = () => {
    console.log('aaa')
  }

  // カラム
  const columns = [
    // 削除ボタン
    {
      field: 'deleteBtn',
      headerName: 'delete',
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params: { id: any }) => (
        <a onClick={handleDelete} href="#">
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
      renderCell: (params: { id: any }) => (
        <a onClick={handleEdit} href="#">
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
          <a>{params.value}</a>
        </Link>
      ),
    },
  ]

  return (
    <>
      <DataGrid rows={data} columns={columns} autoHeight pageSize={10} />
    </>
  )
}
