'use strict'
const randomBytes = require('crypto').randomBytes

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const ddb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context, callback) => {
  try {
    const requestBody = JSON.parse(event.body)

    if (!validateData(requestBody)) {
      errorResponse('Incomplete fields', context.awsRequestId, callback, 400)
      return
    }

    const tool = await createTool(requestBody)
    
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(tool)
    })
  } catch (error) {
    console.log(error)

    errorResponse(error.message, context.awsRequestId, callback)
  }
}

function createTool({ title, link, description, tags }) {
  const id = toUrlString(randomBytes(16))

  const params = {
    TableName: 'toolsTable',
    Item: {
      id,
      title,
      link,
      description,
      tags,
    },
  }

  return ddb.put(params).promise()
}

function toUrlString(buffer) {
  return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
}

function validateData(requestBody) {
  if (!requestBody) return false

  if (!requestBody.title || !requestBody.link || !requestBody.description || !requestBody.tags) {
    return false
  }

  return true
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
