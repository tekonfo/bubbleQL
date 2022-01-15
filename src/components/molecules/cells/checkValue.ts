import { RelationCell } from './relationCell'
import { TextCell } from './text'
const relationReExp = new RegExp('^\\d+x\\d+$')

export enum ValueType {
  Text,
  Boolean,
  Number,
  Date,
  Geographic,
  Image,
  File,
  Relation,
}

export const checkValue = (value: any): ValueType => {
  if (Array.isArray(value)) {
    return checkValue(value[0])
  }
  if (relationReExp.exec(value)) {
    return ValueType.Relation
  }
  return ValueType.Text
}

export const renderCell = (
  type: ValueType,
  value: any,
  onChange: any,
  onBlur: any,
) => {
  switch (type) {
    case ValueType.Relation:
      return RelationCell(value, onChange, onBlur)
    default:
      return TextCell(value, onChange, onBlur)
  }
}
