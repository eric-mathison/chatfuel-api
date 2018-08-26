import textMessage from './types/text';
import imageMessage from './types/image';
import videoMessage from './types/video';
import audioMessage from './types/audio';
import fileMessage from './types/file';
import blockButton from './types/buttons/blockButton';
import urlButton from './types/buttons/urlButton';
import jsonButton from './types/buttons/jsonButton';
import gallery from './types/gallery';
import galleryCard from './types/galleryCard';
import list from './types/list';
import listItem from './types/listItem';

class Chatfuel {
    constructor() {
        this.template = {};
        this.wrapper = {};
    }

    addMessages(message) {
        if (!this.template.messages) {
            this.template.messages = [];
        }

        this.template.messages = [...this.template.messages, message];
        return this.template;
    }

    addButtons(button) {
        if (!this.wrapper.buttons) {
            this.wrapper.buttons = [];
        }

        this.wrapper.buttons = [...this.wrapper.buttons, button];
        this.wrapper.buttons.length = Math.min(this.wrapper.buttons.length, 3);
        return this.wrapper;
    }

    addElements(type, element) {
        if (!this.wrapper.elements) {
            this.wrapper.elements = [];
        }

        this.wrapper.elements = [...this.wrapper.elements, element];
        if (type === 'gallery') {
            this.wrapper.elements.length = Math.min(this.wrapper.elements.length, 10);
        }
        if (type === 'list') {
            this.wrapper.elements.length = Math.min(this.wrapper.elements.length, 5);
        }
        return this.wrapper;
    }

    render(type) {
        return type === 'button' ? this.wrapper : this.template;
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

    addGallery() {
        this.addMessages(gallery(...this.wrapper.elements));
        return this;
    }

    addGalleryCard(title, imageUrl, subTitle, ...buttons) {
        const card = galleryCard(title, imageUrl, subTitle, buttons);
        this.addElements('gallery', card);
        return this;
    }

    addList() {
        this.addMessages(list(this.wrapper.listButton, ...this.wrapper.elements));
        return this;
    }

    addListButton(button) {
        this.wrapper.listButton = button;
        return this;
    }

    addListItem(title, imageUrl, subTitle, ...buttons) {
        const item = listItem(title, imageUrl, subTitle, buttons);
        this.addElements('list', item);
        return this;
    }
}

export default Chatfuel;
