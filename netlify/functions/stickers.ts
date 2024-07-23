const { client } = require('../../utils/sanity-client');

exports.handler = async function(event, context) {
  const query = `*[_type == "sticker"] | order(name desc){_id, name, description, "sticker": sticker.asset->url}`;

  try {
    const stickers = await client.fetch(query);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
        'Access-Control-Allow-Methods': 'GET', // Allow specific methods
      },
      body: JSON.stringify(stickers)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
        'Access-Control-Allow-Methods': 'GET', // Allow specific methods
      },
      body: JSON.stringify({ error: 'Failed to fetch stickers' })
    };
  }
};
