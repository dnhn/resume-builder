import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb'

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const getDbItem = (key: string) =>
  docClient.send(
    new GetCommand({
      TableName: process.env.USER_DYNAMODB_TABLE || '',
      Key: { key },
    }),
  )

export const putDbItem = (key: string, data: any) =>
  docClient.send(
    new PutCommand({
      TableName: process.env.USER_DYNAMODB_TABLE || '',
      Item: {
        key,
        data,
      },
    }),
  )

export const deleteDbItem = (key: string) =>
  docClient.send(
    new DeleteCommand({
      TableName: process.env.USER_DYNAMODB_TABLE || '',
      Key: { key },
    }),
  )
