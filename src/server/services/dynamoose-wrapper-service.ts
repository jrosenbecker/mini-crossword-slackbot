import * as dynamoose from 'dynamoose';

dynamoose.AWS.config.update({
  accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY,
  region: process.env.DYNAMO_REGION
});

export { dynamoose };
