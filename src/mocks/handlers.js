import { rest } from 'msw';
import vesselsFixture from './fixtures/vessels.json';

export const handlers = [
  rest.get('/api/vessels', (req, res, ctx) => {
    return res(ctx.json(vesselsFixture), ctx.set('Access-Control-Allow-Origin', '*'));
  }),
];
