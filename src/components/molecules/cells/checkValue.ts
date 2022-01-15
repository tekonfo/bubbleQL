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
  if (relationReExp.exec(value)) {
    return ValueType.Relation
  }
  return ValueType.Text
}
