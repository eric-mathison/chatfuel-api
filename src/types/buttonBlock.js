import attachments from './attachment';

const buttonBlock = (text, buttons, qReplies) => {
    if (!text) {
        throw new Error('Expected a text parameter');
    }

    if (!buttons) {
        throw new Error('Expected a buttons parameter');
    }

    const buttonsArray = !buttons.buttons ? buttons : buttons.buttons;

    const buttonWrapper = {
        template_type: 'button',
        text,
        buttons: buttonsArray,
    };

    const response = attachments('template', buttonWrapper, qReplies);

    return response;
};

export default buttonBlock;
