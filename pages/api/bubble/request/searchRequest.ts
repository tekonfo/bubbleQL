import { Constraint } from '../../model/bubble/Constraint'
import Request from './request'

export default class SearchRequest extends Request {
  constraints: Array<Constraint>
  limit: number
  cursor: number
  sortField: string
  descending: boolean
  additionalSortFields: Array<string>

  constructor(
    url: string,
    constraints: Array<Constraint>,
    limit: number = 100,
    cursor: number = 0,
    sortField: string = '',
    descending: boolean = false,
    additionalSortFields: Array<string> = [],
  ) {
    super(url)
    this.constraints = constraints
    this.limit = limit
    this.cursor = cursor
    this.sortField = sortField
    this.descending = descending
    this.additionalSortFields = additionalSortFields
  }

  // TODO: これまだ途中。これ進めていく
  encodeParams() {
    const array = []
    // array.push('api_token=' + this.apiToken)
    const jsonConstraints = this.constraints.map(c => c.toJson())
    const stringConstraints = jsonConstraints.join(',')
    array.push('constraints=[' + stringConstraints + ']')
    // array.push('sort_field=' + this.sortField)
    return array.join('&')
  }
}
