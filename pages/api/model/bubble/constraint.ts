export class Constraint {
  key: string
  constraintType: ConstraintType
  value: string | number | GeographicType
  constructor(
    key: string,
    type: ConstraintType,
    value: string | number | GeographicType,
  ) {
    this.key = key
    this.constraintType = type
    this.value = value
  }

  // objectにする
  toJson(): string {
    let v: string | number = ''
    if (this.value instanceof GeographicType) {
      v = this.value.toJson()
    } else {
      v = this.value
    }
    const value = {
      key: this.key,
      constraint_type: this.constraintType,
      value: v,
    }
    return JSON.stringify(value)
  }
}

export class GeographicType {
  originAddress: string
  range: number
  unit: string
  constructor(address: string, range: number, unit: string = 'miles') {
    this.originAddress = address
    this.range = range
    this.unit = unit
  }
  // TODO: ここで//がパスに含まれて困る
  toJson() {
    const value = {
      range: this.range,
      origin_address: this.originAddress,
      unit: this.unit,
    }
    return JSON.stringify(value)
  }
}

export enum ConstraintType {
  // 全文検索に使えるらしい
  _All = 'all',
  Equals = 'equals',
  NotEquals = 'not equal',
  IsEmpty = 'is_empty',
  IsNotEmpty = 'is_not_empty',
  TextContains = 'text contains',
  NotTextContains = 'text not contains',
  GreaterThan = 'greater than',
  LessThan = 'less than',
  In = 'in',
  NotIn = 'not in',
  Contains = 'contains',
  NotContains = 'not contains',
  Empty = 'empty',
  NotEmpty = 'not empty',
  GeographicSearch = 'geographic_search',
}
