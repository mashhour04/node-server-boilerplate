const router = require('express').Router();
const request = require('request');

router.get('/*', (req, res) => {
  const bucketBase = process.env.Minio_URL;
  const filePath = `http://${bucketBase}/${req.path}`;

  const proxy = request({ url: filePath });
  proxy
    .on('response', proxyResponse => {
      // proxyResponse is an object here
      return proxyResponse;
    })
    .pipe(res);
});
module.exports = router;
