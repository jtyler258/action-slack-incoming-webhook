const core = require('@actions/core')

function createMessage() {
  const fields = [
    'text',
    'blocks',
    'attachments',
    'thread_ts',
    'mrkdwn',
  ]

  const jsonFields = [
    'blocks',
    'attachments',
  ]

  const message = fields.reduce((json, field) => {
    let value = core.getInput(field)
    if (value) {
      try {
        if (jsonFields.includes(field)) {
          core.warning('found json field')
          core.error(value)
          core.warning('----')
          json[field] = JSON.parse(value.replace(/\r?\n/g, ' '))
        } else {
          json[field] = JSON.parse(value)
        }
      } catch (error) {
        json[field] = value
      }
    } 
    return json
  }, {})

  return message
}

module.exports = createMessage
