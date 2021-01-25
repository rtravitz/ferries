import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../../components/App'
import vesselsFixture from '../../mocks/fixtures/vessels.json'

describe('App', () => {
  const server = setupServer(
    rest.get('http://localhost:5000/ferries', (req, res, ctx) => {
      return res(ctx.json(vesselsFixture))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('shows ferry icons when vessels are retrieved successfully', async () => {
    render(<App />)

    await screen.findAllByAltText('good ferry icon')
  })

  it('shows an error message when vessel fail to update', async () => {
    server.use(
      rest.get('http://localhost:5000/ferries', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'You sunk my battleship!' }))
      }),
    )

    render(<App />)

    await screen.findByText('There was an error fetching updated vessel information.')
  })
})
