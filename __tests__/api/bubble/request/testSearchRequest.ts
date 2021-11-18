import SearchRequest from '../../../../pages/api/bubble/request/searchRequest'
import {
  Constraint,
  ConstraintType,
} from '../../../../pages/api/model/bubble/Constraint'

describe('test searchRequest encodeParams', () => {
  const constraintsArr: Array<Constraint> = []
  constraintsArr.push(new Constraint('name', ConstraintType.Equals, 'cc'))
  constraintsArr.push(new Constraint('class', ConstraintType.IsEmpty, ''))
  const searchRequest = new SearchRequest('', constraintsArr)

  const assert = `constraints=[{"key":"name","constraint_type":"equals","value":"cc"},{"key":"class","constraint_type":"is_empty","value":""}]`

  test('normal pattern', async () => {
    expect.hasAssertions()
    const encode = searchRequest.encodeParams()
    expect(encode).toStrictEqual(assert)
  })
})
