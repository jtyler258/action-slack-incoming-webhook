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
    core.warning(field)
    let value = core.getInput(field)
    if (value) {
      try {
        if (jsonFields.includes(field)) {
          core.error(value)
          json[field] = JSON.parse(value.replace(/\r?\n/g, ' '))
        } else {
          json[field] = JSON.parse(value)
        }
      } catch (error) {
        json[field] = value
      }
    } else {
      core.warning('not found')
    }
    return json
  }, {})

  return message
}

module.exports = createMessage
