const axios = require('axios');

exports.handler = async () => {
  try {
    const res = await axios.get('https://www.wsdot.com/Ferries/VesselWatch/Vessels.ashx');
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
