import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb'

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: process.env.USER_AWS_REGION || '',
    credentials: {
      accessKeyId: process.env.USER_AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.USER_AWS_SECRET_KEY || '',
    },
  }),
)

export const getDbItem = async (key: string) =>
  docClient.send(
    new GetCommand({
      TableName: process.env.USER_DYNAMODB_TABLE || '',
      Key: { key },
    }),
  )

export const putDbItem = async (key: string, data: any) =>
  docClient.send(
    new PutCommand({
      TableName: process.env.USER_DYNAMODB_TABLE || '',
      Item: {
        key,
        data,
      },
    }),
  )

export const deleteDbItem = async (key: string) =>
  docClient.send(
    new DeleteCommand({
      TableName: process.env.USER_DYNAMODB_TABLE || '',
      Key: { key },
    }),
  )
