export default function TableTh({ value }: { value?: string }) {
  return <th key={value}>{value}</th>
}
