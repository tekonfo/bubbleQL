import Bubble from '../../../pages/api/model/bubble/Bubble'
import { BubbleRouting } from '../../../pages/api/routing'

describe('next-test-api-route-handler test', () => {
  const bubble = new Bubble('try-plugin', '', true)

  test('API ROUTEのテスト GET', async () => {
    expect.hasAssertions()
    const url = bubble.getDataEndpoint('test')
    expect(url).toStrictEqual(
      'https://try-plugin.bubbleapps.io/version-test/api/1.1/obj/test',
    )
  })
})

describe('', () => {
  const routing = new BubbleRouting()
  test
})
