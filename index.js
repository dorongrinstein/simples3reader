const express = require('express');
const app = express();



app.use(express.json());
app.post('/api/add', (req, res) => {
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  if (isNaN(a) || isNaN(b)) {
    res.status(400).send('Error: invalid number');
  } else {
    res.send(`${a + b}`);
  }
});

app.get('/api/health', (req, res) => res.status(200).send('ok'));

app.get('/api', (req, res) => res.send('I am coding on the server side'));



const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({ region: 'us-west-2' });

app.get('/api/list', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({ Bucket: 'dorongrinstein' });
    const data = await s3Client.send(command);
    const files = data.Contents.map(file => file.Key);
    res.send(JSON.stringify(files));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing S3 objects');
  }
});

app.listen(8000);
