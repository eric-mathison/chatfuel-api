import textMessage from './types/text';
import imageMessage from './types/image';

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

    image(url) {
        this.addMessages(imageMessage(url));
        return this;
    }
}

export default Message;
