export default class Constraint {
  key: string
  constraintType: ConstraintType
  value: string | number | GetgraphicType
  constructor(
    key: string,
    type: ConstraintType,
    value: string | number | GetgraphicType,
  ) {
    this.key = key
    this.constraintType = type
    this.value = value
  }

  // objectにする
  toJson() {}
}

class GetgraphicType {
  originAddress: string
  range: string
  unit: string
  constructor(address: string, range: string, unit: string) {
    this.originAddress = address
    this.range = range
    this.unit = unit
  }
}

enum ConstraintType {
  // 全文検索に使えるらしい
  _All,
  Equals,
  NotEquals,
  IsEmpty,
  IsNotEmpty,
  TextContains,
  NotTextContains,
  GreaterThan,
  LessThan,
  In,
  NotIn,
  Contains,
  NotContains,
  Empty,
  NotEmpty,
  GeographicSearch,
}
