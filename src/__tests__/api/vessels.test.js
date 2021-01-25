import { rest } from 'msw'
import { setupServer } from 'msw/node'
const { handler } = require('../../api/vessels')

describe('vessels lambda', () => {
  const server = setupServer(
    rest.get('https://www.wsdot.com/Ferries/VesselWatch/Vessels.ashx', (req, res, ctx) => {
      return res(
        ctx.json({ feedname: "Ferry VesselWatch", vessellist: [] }),
      )
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('returns the data when the call to retrieve vessel status is successful', async () => {
    const result = await handler() 
    expect(result).toEqual({
      statusCode: 200,
      body: '{"feedname":"Ferry VesselWatch","vessellist":[]}',
    })
  })

  it('returns the error if something goes wrong', async () => {
    server.use(
      rest.get('https://www.wsdot.com/Ferries/VesselWatch/Vessels.ashx', (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json({ message: 'You sunk my battleship!' }),
        )
      })
    )

    const result = await handler() 

    expect(result).toEqual({
      statusCode: 500,
      body: 'Error: Request failed with status code 503',
    })
  })
})

