import got from 'got'
import fetchMock from 'jest-fetch-mock'
import { NextApiRequest, NextApiResponse } from 'next'
import nock from 'nock'

import handler from '../../../pages/api/bubble'
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
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const routing = new BubbleRouting()

  fetchMock.mockResponseOnce(JSON.stringify({ data: 12345 }))

  const scope = nock('https://api.github.com')
    .get('/repos/atom/atom/license')
    .reply(200, {
      license: {
        key: 'mit',
        name: 'MIT License',
        spdx_id: 'MIT',
        url: 'https://api.github.com/licenses/mit',
        node_id: 'MDc6TGljZW5zZTEz',
      },
    })

  const url = 'https://api.github.com/repos/atom/atom/license'

  test('400', async () => {
    const res = await got.get(url)
    console.log(res.body)
  })
})
