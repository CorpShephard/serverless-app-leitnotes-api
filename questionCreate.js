import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.questionsTable,
    Item: {
	  questionId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
	  topic: data.topic,
      content: data.content,
	  answer: data.answer,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch(e) {
	  console.log(e);
	  callback(null, failure({status: false}));
  }
}