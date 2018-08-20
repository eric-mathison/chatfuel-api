import textMessage from './types/text';
import imageMessage from './types/image';
import videoMessage from './types/video';
import audioMessage from './types/audio';
import fileMessage from './types/file';
import blockButton from './types/buttons/blockButton';
import urlButton from './types/buttons/urlButton';
import jsonButton from './types/buttons/jsonButton';

class Chatfuel {
    constructor() {
        this.template = {};
    }

    addMessages(message) {
        if (!this.template.messages) {
            this.template.messages = [];
        }

        this.template.messages = [...this.template.messages, message];
        return this;
    }

    addButtons(button) {
        if (!this.template.buttons) {
            this.template.buttons = [];
        }

        this.template.buttons = [...this.template.buttons, button];
        this.template.buttons.length = Math.min(
            this.template.buttons.length,
            3
        );
        return this.template;
    }

    addElements(element) {
        if (!this.template.elements) {
            this.template.elements = [];
        }

        this.template.elements = [...this.template.elements, element];
        if (element === 'gallery') {
            this.template.elements.length = Math.min(
                this.template.elements.length,
                10
            );
        }
        if (element === 'list') {
            this.template.elements.length = Math.min(
                this.template.elements.length,
                5
            );
        }
        return this.template;
    }

    render() {
        return this.template;
    }

    addButton(type, attr, title) {
        if (type === 'block') {
            this.addButtons(blockButton(attr, title));
            return this;
        }
        if (type === 'link') {
            this.addButtons(urlButton(attr, title));
            return this;
        }
        if (type === 'json') {
            this.addButtons(jsonButton(attr, title));
            return this;
        }
        return this;
    }

    addText(textInput) {
        this.addMessages(textMessage(textInput));
        return this;
    }

    addImage(url) {
        this.addMessages(imageMessage(url));
        return this;
    }

    addVideo(url) {
        this.addMessages(videoMessage(url));
        return this;
    }

    addAudio(url) {
        this.addMessages(audioMessage(url));
        return this;
    }

    addFile(url) {
        this.addMessages(fileMessage(url));
        return this;
    }
}

export default Chatfuel;
