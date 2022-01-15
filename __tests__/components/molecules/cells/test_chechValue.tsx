import '@testing-library/jest-dom/extend-expect'
import {
  checkValue,
  ValueType,
} from '../../../../src/components/molecules/cells/checkValue'

describe('checkValue', () => {
  test('check Relation', () => {
    const value = '22222x333333'
    const res = checkValue(value)
    expect(res).toEqual(ValueType.Relation)
  })

  test('check Text', () => {
    const value = 'www22222x3333334'
    const res = checkValue(value)
    expect(res).toEqual(ValueType.Text)
  })
})
