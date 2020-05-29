'use strict'

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const ddb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context, callback) => {
  try {
    const { id } = event.pathParameters

    await deleteTool(id)

    callback(null, {
      statusCode: 204,
      body: JSON.stringify({})
    })
  } catch (error) {
    console.log(error)

    errorResponse(error.message, context.awsRequestId, callback)
  }
}

function deleteTool(id) {
  const params = {
    TableName: 'toolsTable',
    Key: {
      id
    }
  }

  return ddb.delete(params).promise()
}

function errorResponse(errorMessage, awsRequestId, callback, statusCode = 500) {
  callback(null, {
    statusCode,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
  })
}
