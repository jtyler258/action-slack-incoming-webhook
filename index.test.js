const process = require('process')
const path = require('path')
const createMessage = require('./lib/createMessage')

test('test create message with text', () => {
  setupInputs({
    'text': 'hello',
  })

  const message = createMessage()

  expect(message.text).toEqual('hello')
})

test('test create message with blocks', () => {
  const blocks = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "A message *with some bold text* and _some italicized text_."
      }
    }
  ]

  setupInputs({
    'blocks': JSON.stringify(blocks),
  })

  const message = createMessage()
  expect(message.blocks[0].text.type).toEqual('mrkdwn')
})

test('test create message with attachments', () => {
  const attachments = [
    {
      "color": "good",
      "text": "foo",
    }
  ]

  setupInputs({
    'attachments': JSON.stringify(attachments),
  })

  const message = createMessage()
  expect(message.attachments[0].color).toEqual('good')
})

test('test create message with thread_ts', () => {
  setupInputs({
    'thread_ts': '1571797440.006700',
  })

  const message = createMessage()

  expect(message.thread_ts).toEqual(1571797440.0067)
})

test('test create message with double', () => {
  setupInputs({
    'thread_ts': 1571797440.006700,
  })

  const message = createMessage()

  expect(message.thread_ts).toEqual(1571797440.0067)
})

test('test create message with bool', () => {
  setupInputs({
    'mrkdwn': false,
  })

  const message = createMessage()

  expect(message.mrkdwn).toEqual(false)
})

function setupInputs(inputs) {
  for (const input in inputs) {
    let key = 'INPUT_' + input.toUpperCase()
    process.env[key] = inputs[input]
  }
}

