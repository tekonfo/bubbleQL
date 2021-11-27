import { testApiHandler } from 'next-test-api-route-handler'
import handler from '../../../pages/api/bubble/where'
import Bubble from '../../../pages/api/model/bubble/Bubble'

describe('next-test-api-route-handler test', () => {
  const bubble = new Bubble('try-plugin', '', true)
  const url = bubble.getDataEndpoint('test')
  test('pass', async () => {})

  // TODO: testをmock化しないとリクエストが流れまくる
  // test('API ROUTEのテスト GET', async () => {
  //   expect.hasAssertions()
  //   await testApiHandler({
  //     requestPatcher: req => (req.url = url),
  //     handler,
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: 'GET',
  //       })
  //       expect(await res.json()).toStrictEqual({
  //         name: '0',
  //         results: [],
  //       })
  //     },
  //   })
  // })
})
