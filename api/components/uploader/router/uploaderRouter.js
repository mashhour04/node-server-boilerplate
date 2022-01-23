const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const mime = require('mime-types');
const Promise = require('bluebird');
const Minio = require('minio');
const { ApplicationError } = require('../../../shared/errors');

const minioOptions = {
  endPoint: process.env.Minio_URL,
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
};

console.log('db', process.env.Minio_URL);

let minioClient = new Minio.Client(minioOptions);

let retries = 0;
const presignedPutObject = Promise.promisify(
  minioClient.presignedPutObject
).bind(minioClient);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve('./uploads'));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });
const logger = require('../../../startup/logger');

const mailBucket = 'mail';
const router = express.Router();

initiateMinio();

// @ GET api/uploader/
// !access  USER
router.post(
  '/',
  upload.single('file'),
  /**
   * @params: {query: {'file-name': String, 'file-ext': String}}
   * @Returns: {presignedURL: 'url to use to upload your file',
   * @                   url: 'the url your file will be uploaded to'}
   */
  async (req, res) => {
    if (req.file) {
      const file = req.file;
      try {
        const fileName = file.filename;
        const outputPath = path.join(path.resolve('./uploads/'), fileName);
        const outputUrl = `/uploads/${file}`;
        //! Save the file using fs
        fs.writeFileSync(outputPath, file.buffer);
        return res.status(200).json({
          converted: true,
          uploaded: true,
          fileName,
          path: outputUrl
        });
      } catch (ex) {
        logger.info(
          `file-upload-failed ==>>>> ${JSON.stringify(ex, undefined, 4)}`
        );
        return res.status(500).send({ error: 'something wrong!!' });
      }
    }
  }
);

// @ GET api/uploader/sign
// !access  USER
router.get(
  '/sign',

  /**
   * @params: {query: {'file-name': String, 'file-ext': String}}
   * @Returns: {presignedURL: 'url to use to upload your file',
   * @                   url: 'the url your file will be uploaded to'}
   */
  async (req, res) => {
    const filename = req.query['file-name'];
    const fileExt = req.query['default-ext'];

    const defaultExt = fileExt;
    let extension = filename.match(/\.(\w+$)/);

    extension =
      extension && extension.length > 1 && mime.contentType(extension[1])
        ? extension[1]
        : defaultExt;

    const contentStorageKey = `${Date.now()}-${filename}`;

    const { contentType } = {
      contentType: mime.contentType(extension)
    };

    try {
      const policy = minioClient.newPostPolicy();
      policy.setContentType(contentType);
      policy.setBucket(mailBucket);
      const presignedURL = await minioClient.presignedPutObject(
        mailBucket,
        contentStorageKey,
        7 * 24 * 60 * 60
      );
      const postPolicy = await minioClient.presignedPostPolicy(policy);
      const imageLink = `http://${process.env.Minio_URL}:${process.env.Minio_PORT}/mail/${contentStorageKey}`;
      return res.status(200).send({
        imageLink,
        formData: postPolicy.formData,
        postURL: postPolicy.postURL,
        presignedURL,
        contentType
      });
    } catch (ex) {
      logger.info(
        `image-upload-failed ==>>>> ${JSON.stringify(ex.message, undefined, 4)}`
      );
      return res.status(500).send({ error: 'something wrong!!' });
    }
  }
);

// eslint-disable-next-line consistent-return
async function initiateMinio() {
  try {
    if (retries >= 1) {
      minioOptions.endPoint = 'localhost';
      minioClient = new Minio.Client(minioOptions);
    }
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Action: ['s3:ListBucket'],
          Effect: 'Allow',
          Principal: {
            AWS: ['*']
          },
          Resource: [`arn:aws:s3:::${mailBucket}`],
          Sid: 'Public'
        },
        {
          Action: ['s3:GetObject', 's3:PutObject'],
          Effect: 'Allow',
          Principal: {
            AWS: ['*']
          },
          Resource: [`arn:aws:s3:::${mailBucket}/*`],
          Sid: 'Public'
        }
      ]
    };
    const mailBucketExists = await minioClient.bucketExists(mailBucket);
    console.log('Minio Started Successfuly ===>');
    if (mailBucketExists) {
      await minioClient.setBucketPolicy(mailBucket, JSON.stringify(policy));
      return true;
    }
    await minioClient.makeBucket(mailBucket, 'us-east-1');
    return true;
  } catch (err) {
    if (retries >= 1) {
      console.log(
        '\x1b[31m',
        '%c unable to initiate minio s3 bucket throwing error ======>',
        err.message
      );
      throw new ApplicationError(
        `unable to initiate minio s3 bucket ======> ${err.message}`
      );
    }

    console.log(
      '\x1b[31m',
      '%c unable to initiate minio s3 bucket ======> Retrying with localhost'
    );
    retries += 1;
    initiateMinio();
  }
}

module.exports = router;
