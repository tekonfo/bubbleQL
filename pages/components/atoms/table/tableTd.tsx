export default function TableTd({ children }: { children?: string }) {
  return <td key={children}>{children}</td>
}
