import textMessage from './types/text';
import imageMessage from './types/image';
import videoMessage from './types/video';
import audioMessage from './types/audio';
import fileMessage from './types/file';
import blockButton from './types/buttons/blockButton';
import urlButton from './types/buttons/urlButton';
import jsonButton from './types/buttons/jsonButton';
import callButton from './types/buttons/callButton';
import gallery from './types/gallery';
import galleryCard from './types/galleryCard';
import buttonBlock from './types/buttonBlock';
import quickReply from './types/quickReply';
import attributes from './types/attributes';

class Chatfuel {
    constructor() {
        this.template = {};
        this.wrapper = {};
    }

    messages(message) {
        if (!this.template.messages) {
            this.template.messages = [];
        }

        this.template.messages = [...this.template.messages, message];
        return this.template;
    }

    quickReplies(qR) {
        if (!this.wrapper.quick_replies) {
            this.wrapper.quick_replies = [];
        }

        this.wrapper.quick_replies = [...this.wrapper.quick_replies, qR];
        this.wrapper.quick_replies.length = Math.min(this.wrapper.quick_replies.length, 11);
        return this.wrapper;
    }

    buttons(button) {
        if (!this.wrapper.buttons) {
            this.wrapper.buttons = [];
        }

        this.wrapper.buttons = [...this.wrapper.buttons, button];
        this.wrapper.buttons.length = Math.min(this.wrapper.buttons.length, 3);
        return this.wrapper;
    }

    elements(type, element) {
        if (!this.wrapper.elements) {
            this.wrapper.elements = [];
        }

        this.wrapper.elements = [...this.wrapper.elements, element];
        if (type === 'gallery') {
            this.wrapper.elements.length = Math.min(this.wrapper.elements.length, 10);
        }

        return this.wrapper;
    }

    render(type) {
        return type === 'button' || type === 'qr' ? this.wrapper : this.template;
    }

    addText(textInput, qReplies) {
        this.messages(textMessage(textInput, qReplies));
        return this;
    }

    addImage(url, qReplies) {
        this.messages(imageMessage(url, qReplies));
        return this;
    }

    addVideo(url, qReplies) {
        this.messages(videoMessage(url, qReplies));
        return this;
    }

    addAudio(url, qReplies) {
        this.messages(audioMessage(url, qReplies));
        return this;
    }

    addFile(url, qReplies) {
        this.messages(fileMessage(url, qReplies));
        return this;
    }

    addButton(type, attr, title, extensions) {
        if (type === 'block') {
            this.buttons(blockButton(attr, title));
            return this;
        }
        if (type === 'link') {
            this.buttons(urlButton(attr, title, extensions));
            return this;
        }
        if (type === 'json') {
            this.buttons(jsonButton(attr, title));
            return this;
        }
        if (type === 'call') {
            this.buttons(callButton(attr, title));
            return this;
        }
        return this;
    }

    addButtonBlock(textInput, buttons, qReplies) {
        this.messages(buttonBlock(textInput, buttons, qReplies));
        return this;
    }

    addGallery() {
        this.messages(gallery(...this.wrapper.elements));
        return this;
    }

    addGalleryCard(title, imageUrl, subTitle, ...buttons) {
        const card = galleryCard(title, imageUrl, subTitle, buttons);
        this.elements('gallery', card);
        return this;
    }

    addQuickReply(type, attr, title) {
        this.quickReplies(quickReply(type, attr, title));
        return this;
    }

    addAttributes(attribute, type, title, opt) {
        this.template = attributes(attribute, type, title, opt);
        return this;
    }

    addRedirect(...blocks) {
        this.template.redirect_to_blocks = blocks;
        return this;
    }
}

export default Chatfuel;
