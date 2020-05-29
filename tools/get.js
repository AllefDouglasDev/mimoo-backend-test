'use strict'

const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const ddb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context, callback) => {
  try {
    const tag = event.queryStringParameters ? event.queryStringParameters.tag : ''

    const data = await findTools(tag)
    
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.log(error)

    errorResponse(error.message, context.awsRequestId, callback)
  }
}

async function findTools(tag) {
  const params = {
    TableName : 'toolsTable'
  }

  const data = await ddb.scan(params).promise()

  const tools = tag.length > 0 
    ? data.Items.filter(tool => !!tool.tags.find(toolTag => toolTag === tag))
    : data.Items

  return tools
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
  })
}

/*

const data = {
    Items: [
      {
        id: 1,
        title: "Notion",
        link: "https://notion.so",
        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
        tags: [
            "organization",
            "planning",
            "collaboration",
            "writing",
            "calendar"
        ]
      }
    ]
  }

*/