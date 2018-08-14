import textMessage from './types/text';
import imageMessage from './types/image';
import videoMessage from './types/video';
import audioMessage from './types/audio';
import fileMessage from './types/file';

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

    audio(url) {
        this.addMessages(audioMessage(url));
        return this;
    }

    file(url) {
        this.addMessages(fileMessage(url));
        return this;
    }
}

export default Message;
