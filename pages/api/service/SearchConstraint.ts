import Constraint from '../model/bubble/Constraint'

export default class SearchConstraint {
  constraints: Array<Constraint>
  constructor(lists: Array<any>) {
    this.constraints = lists
  }
  // TODO: test
  encoded(): string {
    const jsonConstraints = this.constraints.map(c => c.toJson())
    const stringConstraints = jsonConstraints.join(',')
    return encodeURI('constraints=[' + stringConstraints + ']')
  }
}
