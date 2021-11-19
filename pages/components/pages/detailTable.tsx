// ReactDOM.createPortal()の第一引数に指定するコンポーネントです。
// Atomic Designのpages層に相当しますが、ただtemplatesを呼び出すだけのwrapperとなっています。
import DetailTableTemplate from '../templates/detailTableTemplate'

export default function DetailTable() {
  return <DetailTableTemplate />
}
