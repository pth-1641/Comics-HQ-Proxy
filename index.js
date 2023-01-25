const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const referer = process.env.REFERER_URL;
app.use(express.json());

app.use('/', async (req, res) => {
  try {
    const { src } = req.query;
    const { data } = await axios({
      method: 'GET',
      url: src,
      responseType: 'stream',
      headers: {
        Accept: '*/*',
        referer,
      },
    });
    return data.pipe(res);
  } catch (err) {
    res.json({
      message: err?.message || 'Bad request',
    });
  }
});

app.listen(port);
