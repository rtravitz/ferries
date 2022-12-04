import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../../src/components/App';
import vesselsFixture from '../../src/mocks/fixtures/vessels.json';
import { defer } from '../utils';
import { LOADING_SCREEN_UNMOUNT_DURATION } from '../../src/constants';

describe('App', () => {
  const server = setupServer(
    rest.get('http://localhost:5273/api/vessels', (req, res, ctx) => {
      return res(ctx.json(vesselsFixture));
    }),
  );

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('shows ferry icons when vessels are retrieved successfully', async () => {
    render(<App />);

    await screen.findAllByAltText('good ferry icon');
  });

  it('shows an error message when vessels fail to update', async () => {
    server.use(
      rest.get('http://localhost:5273/api/vessels', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'You sunk my battleship!' }));
      }),
    );

    render(<App />);

    await screen.findByText('There was an error fetching updated vessel information.');
  });

  it('displays information about a ferry when it is selected', async () => {
    render(<App />);

    const icon = await screen.findByAltText('good ferry icon');

    userEvent.click(icon);

    await waitFor(() => expect(screen.getByText('Docked at Anacortes')).toBeInTheDocument());
  });

  it('hides out of service vessels by default', async () => {
    render(<App />);

    const outOfServiceIcon = screen.queryByAltText('out of service ferry icon');

    expect(outOfServiceIcon).toBeNull();
  });

  it('shows out of service vessels after toggling', async () => {
    render(<App />);

    const settingsIcon = await screen.findByAltText('cog icon');
    userEvent.click(settingsIcon);
    const toggle = await screen.findByLabelText('Show out of service vessels');
    userEvent.click(toggle);
    const outOfServiceIcon = await screen.findByAltText('out of service ferry icon');

    expect(outOfServiceIcon).toBeInTheDocument();
  });

  it('displays the loading screen until ferry data is retrieved and then it scales out and unmounts', async () => {
    const testId = 'loading-screen';

    const serverResponse = defer();
    server.use(
      rest.get('http://localhost:5273/api/vessels', async (req, res, ctx) => {
        await serverResponse();
        return res(ctx.json(vesselsFixture));
      }),
    );

    render(<App />);

    const loadingScreen = await screen.findByTestId(testId);

    expect(loadingScreen).toBeInTheDocument();
    expect(loadingScreen.classList.contains('scaleLoadingScreenOut')).toBe(false);

    serverResponse.resolve();

    // This class makes a nice animation where the loading screen expand and fades away
    await waitFor(() => expect(loadingScreen.classList.contains('scaleLoadingScreenOut')).toBe(true));

    // There is a extra delay before unmounting to give the animation time to complete.
    // The timeout here is that value, plus a bit. No flapping tests allowed!
    await waitForElementToBeRemoved(() => screen.getByTestId(testId), {
      timeout: LOADING_SCREEN_UNMOUNT_DURATION + 100,
    });
  });

  it('removes the loading screen even if the network request fails', async () => {
    const testId = 'loading-screen';

    const serverResponse = defer();
    server.use(
      rest.get('http://localhost:5273/api/vessels', async (req, res, ctx) => {
        await serverResponse();
        return res(ctx.status(500), ctx.json({ message: 'You sunk my battleship!' }));
      }),
    );

    render(<App />);

    const loadingScreen = await screen.findByTestId(testId);

    expect(loadingScreen).toBeInTheDocument();
    expect(loadingScreen.classList.contains('scaleLoadingScreenOut')).toBe(false);

    serverResponse.resolve();

    await waitForElementToBeRemoved(() => screen.getByTestId(testId), {
      timeout: LOADING_SCREEN_UNMOUNT_DURATION + 100,
    });
  });
});
