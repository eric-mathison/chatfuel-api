import textMessage from './types/text';
import imageMessage from './types/image';
import videoMessage from './types/video';

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

    video(url) {
        this.addMessages(videoMessage(url));
        return this;
    }
}

export default Message;
