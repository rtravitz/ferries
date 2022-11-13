import { rest } from 'msw'
import vesselsFixture from './fixtures/vessels.json'

export const handlers = [
  rest.get('http://localhost:5273/ferries', (req, res, ctx) => {
    return res(
      ctx.json(vesselsFixture), 
      ctx.set('Access-Control-Allow-Origin', '*')
    )
  }),
]
