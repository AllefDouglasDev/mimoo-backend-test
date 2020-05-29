'use strict'
const middy = require('middy')
const { jsonBodyParser, httpErrorHandler, validator } = require('middy/middlewares')
const randomBytes = require('crypto').randomBytes

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const ddb = new AWS.DynamoDB.DocumentClient()

const postTool = async (event, context, callback) => {
  try {
    const tool = await createTool(event.body)
    
    callback(null, {
      statusCode: 201,
      body: JSON.stringify(tool)
    })
  } catch (error) {
    console.log(error)

    errorResponse(error.message, context.awsRequestId, callback)
  }
}

async function createTool({ title, link, description, tags }) {
  const id = toUrlString(randomBytes(16))

  const tool = {
    id,
    title,
    link,
    description,
    tags,
  }

  const params = {
    TableName: 'toolsTable',
    Item: tool,
  }

  await ddb.put(params).promise()

  return tool
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

const inputSchema = {
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 },
        link: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        tags: { type: 'array' }
      },
      required: ['title', 'link', 'description', 'tags']
    }
  }
}

module.exports.handler = middy(postTool)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler())
