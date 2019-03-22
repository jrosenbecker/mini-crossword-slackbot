# Mini Crossword Slackbot
The purpose of this repository was to create a slack bot to support slash commands to submit completion times for the new york times mini crossword.

## Setup
This project uses the [serverless](https://serverless.com) framework to deploy using AWS Lambda & API Gateway. Since Lambda currently only supports Node.js 8.10, make sure that 8.10 is installed.

1. Run `npm install` to install the node dependencies
2. Install the AWS CLI if you haven't already. Then use `aws configure` to set up your command line with an IAM User
3. Create a DynamoDB table using the AWS console named `CrosswordEntries`. Use `groupId` as the partition key and `completionTime` as the sort key, both of type string.
4. Create an IAM User and grant Read/Write access to that DynamoDB table. Create a file in the root directory called `serverless.variables.yml` and copy the new user's info to the corresponding fields
```
DYNAMO_ACCESS_KEY_ID: '<access-key>'
DYNAMO_SECRET_ACCESS_KEY: '<secret-key>'
DYNAMO_REGION: 'us-east-1'
```
5. Deploy using `npm run deploy`. You should then be able to set up the slack bot using the URL it gives you back. The slackbot should be posting to the `/command` endpoint.
