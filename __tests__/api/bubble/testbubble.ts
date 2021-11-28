import got from 'got'
import fetchMock from 'jest-fetch-mock'
import { NextApiRequest, NextApiResponse } from 'next'
import nock from 'nock'
import httpMocks from 'node-mocks-http'
import handler from '../../../pages/api/bubble'
import Bubble from '../../../pages/api/model/bubble/Bubble'
import { BubbleRouting } from '../../../pages/api/routing'

const baseUrl = 'https://try-plugin.bubbleapps.io/version-test/api/1.1/obj'
const testUrl =
  'https://try-plugin.bubbleapps.io/version-test/api/1.1/obj/student'

describe('next-test-api-route-handler test', () => {
  const bubble = new Bubble('try-plugin', '', true)

  test('API ROUTEのテスト GET', async () => {
    expect.hasAssertions()
    const url = bubble.getDataEndpoint('student')
    expect(url).toStrictEqual(testUrl)
  })
})

describe('', () => {
  const routing = new BubbleRouting()
  const route = routing.route()
  const mockReq = httpMocks.createRequest<NextApiRequest>({})
  const mockRes = httpMocks.createResponse<NextApiResponse>()

  nock(baseUrl)
    .get('/student')
    .reply(200, {
      response: {
        cursor: 0,
        results: [{ _id: 'aaaaa' }, { _id: 'bbbbb' }],
        remaining: 0,
        count: 12,
      },
    })

  test('200', async () => {
    await handler(mockReq, mockRes)
    console.log(mockRes.json)
  })
})
