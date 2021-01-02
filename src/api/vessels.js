import axios from 'axios'

exports.handler = () => {
  axios.get('https://www.wsdot.com/Ferries/VesselWatch/Vessels.ashx')
    .then((res) => (
      {
        statusCode: 200,
        body: res.data,
      }
    ))
    .catch((err) => (
      {
        statusCode: 500,
        body: err.toString(),
      }
    ))
}