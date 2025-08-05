const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: process.env.AWS_REGION });

/**
 * Upload a file to S3.
 * @param {string} bucket
 * @param {string} key
 * @param {Buffer|Uint8Array|string} body
 * @param {Object} [options]
 */
async function uploadObject(bucket, key, body, options = {}) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ...options,
  });
  return s3.send(command);
}

module.exports = {
  s3,
  uploadObject,
};
