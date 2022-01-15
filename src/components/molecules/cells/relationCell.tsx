export const RelationCell = (value: any, onChange: any, onBlur: any) => {
  if (Array.isArray(value)) {
    return <div>LINKs</div>
  }
  return <div>LINK</div>
}
