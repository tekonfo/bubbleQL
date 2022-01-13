import '@testing-library/jest-dom/extend-expect'
import BubbleService from '../../src/services/bubbleService'
describe('Bubble Service', () => {
  const service = new BubbleService()
  const testArr = [{ a: 1 }, { b: 2 }, { c: 3 }]
  test('renders App component', () => {
    const res = service.getKeyArray(testArr)
    expect(res).toEqual(['a', 'b', 'c'])
  })
})
