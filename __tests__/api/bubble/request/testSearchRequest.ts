import SearchRequest from '../../../../pages/api/bubble/request/searchRequest'
import {
  Constraint,
  ConstraintType,
  GeographicType,
} from '../../../../pages/api/model/bubble/Constraint'

describe('test searchRequest', () => {
  const constraintsArr: Array<Constraint> = []
  constraintsArr.push(new Constraint('name', ConstraintType.Equals, 'cc'))
  constraintsArr.push(new Constraint('class', ConstraintType.IsEmpty, ''))
  const searchRequest = new SearchRequest('', constraintsArr)

  const assert = `constraints=[{"key":"name","constraint_type":"equals","value":"cc"},{"key":"class","constraint_type":"is_empty","value":""}]`

  test('API ROUTEのテスト GET', async () => {
    expect.hasAssertions()
    const encode = searchRequest.encodeParams()
    expect(encode).toStrictEqual(assert)
  })
})
