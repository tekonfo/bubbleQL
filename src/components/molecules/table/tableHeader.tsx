import HideFields from '../tableHeader/hideFields'

export default function TableHeader({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-row">
      <div className="flex-auto">VIEWS</div>
      <div className="flex-auto">Grid View</div>
      <HideFields></HideFields>
      <div className="flex-auto">Filter</div>
      <div className="flex-auto">Group</div>
      <div className="flex-auto">Sort</div>
      <div className="flex-auto">Color</div>
      <div className="flex-auto">Sort</div>
      <div className="flex-auto">Row height</div>
      <div className="flex-auto">Share view</div>
    </div>
  )
}
