const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const referer = process.env.REFERER_URL;
app.use(express.json());

app.use('/proxy', async (req, res) => {
  try {
    const { file } = req.query;
    const response = await axios({
      method: 'GET',
      url: file,
      responseType: 'stream',
      headers: {
        Accept: '*/*',
        referer,
      },
    });
    response.data.pipe(res);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port);
