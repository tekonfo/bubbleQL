import SearchRequest from '../../../../pages/api/bubble/request/searchRequest'
import {
  Constraint,
  ConstraintType,
  GeographicType,
} from '../../../../pages/api/model/bubble/Constraint'

describe('test searchRequest', () => {
  const constraintsArr: Array<Constraint> = []
  constraintsArr.push(
    new Constraint('name', ConstraintType.TextContains, 'cafe'),
  )
  constraintsArr.push(
    new Constraint(
      'address',
      ConstraintType.GeographicSearch,
      new GeographicType('New York', 10),
    ),
  )
  const searchRequest = new SearchRequest('', constraintsArr)

  const assert = `
  constraints=%5B%7B%22key%22%3A%22name%22%2C%22constraint_type%22%3A%22text%20contains%22%2C%20%22value%22%3A%22cafe%22%7D%2C%7B%22key%22%3A%22address%22%2C%22constraint_type%22%3A%22geographic_search%22%2C%22value%22%3A%7B%22range%22%3A10%2C%22origin_address%22%3A%22New%20York%22%7D%7D%5D
  `

  test('API ROUTEのテスト GET', async () => {
    expect.hasAssertions()
    const encode = searchRequest.encodeParams()
    expect(encode).toStrictEqual(assert)
  })
})
