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
    res.status(err?.code || 500).json({
      message: err?.message || 'Bad request',
    });
  }
});

app.use('/', (req, res) => {
  res.send('hiii');
});

app.listen(port);
