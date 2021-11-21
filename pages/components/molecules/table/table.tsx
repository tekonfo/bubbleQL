import TableTbody from '../../atoms/table/tableTbody'
import TableThead from '../../atoms/table/tableThead'
import TableTr from '../../atoms/table/tableTr'

export default function Table({ children }: { children?: React.ReactNode }) {
  return (
    <table>
      <TableThead>
        <TableTr>{th}</TableTr>
      </TableThead>
      <TableTbody>{trs}</TableTbody>
    </table>
  )
}
