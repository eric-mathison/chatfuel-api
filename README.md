# chatfuel-api

[![Build Status](https://travis-ci.org/eric-mathison/chatfuel-api.svg?branch=master)](https://travis-ci.org/eric-mathison/chatfuel-api)

A library to simplify sending messages and broadcasts to a Chatfuel bot.

[Chatfuel JSON API](https://docs.chatfuel.com/api/json-api/json-api)

[Chatfuel Broadcast API](https://docs.chatfuel.com/api/broadcasting-api/broadcasting-api)

## Requirements

Node version 6 and later are required. Earlier versions are not supported.

## Install

```
npm install chatfuel-api
```

## Usage

```
import { Chatfuel, broadcast } from 'chatfuel-api';
```

### Sending JSON Responses to Chatfuel

Instantiate the Chatfuel class for each JSON message sent to Chatfuel

```
new Chatfuel()
```

To render the complete JSON response, call the method

```
.render();
```

### Methods

**Sending Text Messages**

```
.addText('Your text here')
.render()
```

**Sending Image Messages**

```
.addImage('URL of Image')
.render()
```

**Sending Video Messages**

```
.addVideo('URL of Video')
.render()
```

**Sending Audio Messages**

```
.addAudio('URL of Audio File')
.render()
```

**Sending File Messages**

```
.addFile('URL of File')
.render()
```

**Creating Buttons**

Types of buttons: `block, link, json, call`

```
.addButton('button type', 'attr', 'button title', extensions)
.render('button');
```

The `attr` argument depends on the `button type`

| Button Type | 'attr' Argument                     |
| ----------- | ----------------------------------- |
| block       | name of the block                   |
| link        | url                                 |
| json        | url of callback                     |
| call        | phone number _format: +19268881413_ |

When using a link button, the default behavior is to open the link in a new window. You can however enable Messenger extensions and open the link in a webview by passing `true` as the last argument.

```
.addButton('link', 'https://url.com', 'Link', true)
.render('button')
```

**Sending A Button Block**

Buttons cannot be sent to your bot by themselves. They must be accompanied with at least text. Use a button block to send upto 3 buttons with text.

Define your buttons variable first, then pass it to the button block method.

```
const buttons = new Chatfuel()
    .addButton('link', 'https://test.com/test', 'URL Button')
    .addButton('block', 'Test Block', 'Block Button')
    .addButton('block', 'Another Block', 'Block Button 2')
    .render('button');

const message = new Chatfuel()
    .addButtonBlock('Text', buttons)
    .render();
```

**Sending Gallery Messages**

Galleries are composed of gallery cards. It is necessary to define your cards first, then build the gallery response. Gallery cards can also include buttons.

```
const buttons = new Chatfuel()
    .addButton('link', 'https://link.com', 'Test Button')
    .render('button');

const message = new Chatfuel()
    .addGalleryCard('Test Title', 'https://test.url', 'Test Subtitle', buttons)
    .addGallery()
    .render();
```

**Sending Quick Replies**

```
.addQuickReply(type, attr, 'Title')
.render('qr')
```

Quick Replies have two types: Block and JSON. Depending on the type you specify, the attr argument changes.

| Type  | Attr                                          |
| ----- | --------------------------------------------- |
| block | Array of block names _['Block 1', 'Block 2']_ |
| json  | URL of callback                               |

Quick Replies can be attached to the following methods by including the quick relpies as the last argument
: addText(), addImage(), addVideo(), addAudio(), addFile(), addButtonBlock()

```
const qReplies = new Chatfuel()
    .addQuickReply('block', ['Block 1'], 'Yes')
    .addQuickReply('block', ['Block 2'], 'No')
    .render('qr');

const textMessage = new Chatfuel()
    .addText('Testing Text Message', qReplies)
    .render();
```

**Set Attribute**

Chatfuel Attributes can be set by sending the attribute with a button or simply by sending only the attribute. Only JSON and Block buttons are supported.

Sending only the attribute

```
const message = new Chatfuel()
    .addAttributes('attribute')
    .render()
```

Sending an attribute with a JSON Callback Button

```
const message = new Chatfuel()
    .addAttributes('attribute', 'json', 'json button', 'https://callback.url')
    .render()
```

Sending multiple attributes with a Block Button

```
const attributes = {
    attribute1: '1',
    attribute2: '2',
}

const message = new Chatfuel()
    .addAttributes(attributes, 'block', 'block button', ['Block Name'])
    .render()
```

**Sending Redirect to Block Messages**

```
.addRedirect('block 1', 'block 2')
.render()
```

### Sending Broadcasts to Chatfuel

To send broadcasts you'll need the botId, blockId, userId and token from the Chatfuel dashboard. You'll also need to specify the message tag. More information can be found here: [Message Tags](https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags)

Create an object that specifies these options and pass it to the broadcast function.

```
const options = {
    // required
    botId: 'Your Bot URL',
    blockId: 'Block Name',
    token: 'Found in Bot Settings',
    userId: 'Facebook Messenger User ID',
    tag: 'See above URL',

    // optionally set attributes for the user
    attributes: {
        attribute1: 'attr1',
        attribute2: 'attr2',
    },
};
```

The broadcast function returns a promise, so use basic promise handling for the response and error.

```
broadcast(options)
    .then(() => {
        // no response is given
    })
    .catch((err) => {
        console.log(err);
    });
```

### Examples

**Send a text and image message**

```
const message = new Chatfuel()
    .addText('Test Text')
    .addImage('https://imageUrl.png')
    .render();
```

**Send a text, image, video and two quick replies**

```
const qReplies = new Chatfuel()
    .addQuickReply('json', 'https://test.com/test?a=yes', 'JSON Yes Button')
    .addQuickReply('json', 'https://test.com/test?a=no', 'JSON No Button')
    .render('qr');

const response = new Chatfuel()
    .addText('This is a test')
    .addImage('https://test.com/test.png')
    .addVideo('https://test.com/test.mp4', qReplies)
    .render();
```

**Sending a gallery message from a loop**

If you have external data such as a JSON response where you want to create a gallery card in a loop, first extract all the data that you want in the cards into an object in an array.

Example:

```
const galleryArray = [];
// define data
galleryArray.push({defined data});
```

Then build the gallery response from the new array.

```
const gallery = new Chatfuel();
for (let i = 0; i < galleryArray.length; ) {
    gallery.addGalleryCard(
        galleryArray[i].cardTitle,
        galleryArray[i].vehicleImage,
        galleryArray[i].cardSubtitle,
        galleryArray[i].buttons
    );
    i += 1;
}
gallery.addGallery();
gallery.render();
res.send(gallery.template);
```

## Tests

There are over 80 tests to verify everything is working.

Running the tests are easy

```
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details
