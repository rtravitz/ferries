import { http } from 'msw';
import { setupWorker } from 'msw/browser';
import vesselsFixture from '../mocks/fixtures/vessels.json';

export const worker = setupWorker(
  http.get('/api/vessels', () => {
    return new Response(JSON.stringify(vesselsFixture), {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
  })
);
