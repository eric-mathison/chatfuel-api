import textMessage from './types/text';

class Message {
    constructor() {
        this.messages = [];
    }

    addMessages(type) {
        this.messages = [...this.messages, type];
        return this;
    }

    text(textInput) {
        this.addMessages(textMessage(textInput));
        return this;
    }
}

export default Message;
