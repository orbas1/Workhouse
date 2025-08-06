let s3 = null;
let uploadObject = async () => Promise.resolve();

if (process.env.AWS_REGION) {
  const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
  s3 = new S3Client({ region: process.env.AWS_REGION });
  uploadObject = async (bucket, key, body, options = {}) => {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ...options,
    });
    return s3.send(command);
  };
}

module.exports = {
  s3,
  uploadObject,
};
